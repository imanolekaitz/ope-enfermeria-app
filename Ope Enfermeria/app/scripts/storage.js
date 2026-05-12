/**
 * SERVICIO DE ALMACENAMIENTO Y SINCRONIZACIÓN (StorageService)
 * Intercepta y gestiona la persistencia de datos de la aplicación OPE Enfermería.
 * Garantiza respuesta instantánea mediante localStorage como caché primaria (Offline-First)
 * y sincroniza asíncronamente con Supabase PostgreSQL en segundo plano.
 */

class StorageService {
    constructor() {
        // Credenciales de Producción consolidadas en Fase 1
        this.supabaseUrl = 'https://sqcdsxcwqewxetewdsok.supabase.co';
        this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxY2RzeGN3cWV3eGV0ZXdkc29rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1ODEwMjAsImV4cCI6MjA5NDE1NzAyMH0.WpuBUig3vuVJvvpQCbrgn0RuuRJDIgkG8YeCPSkI4Og';
        
        // Inicialización segura del cliente Supabase
        this.supabase = window.supabase ? window.supabase.createClient(this.supabaseUrl, this.supabaseKey) : null;
        
        // Cola local persistente para acciones en modo desconectado
        this.syncQueue = JSON.parse(localStorage.getItem('ope_sync_queue') || '[]');
        this.isSyncing = false;

        // Registrar escucha de reconexión para vaciar cola pendiente
        window.addEventListener('online', () => {
            console.log('🌐 Conexión restaurada. Ejecutando sincronización de fondo...');
            this.processSyncQueue();
        });
    }

    /**
     * Lectura sincrónica instantánea desde la caché local.
     * @param {string} key Identificador de la clave local.
     * @returns {string|null} Valor almacenado o null.
     */
    getItem(key) {
        return localStorage.getItem(key);
    }

    /**
     * Escritura local inmediata con propagación asíncrona a la nube.
     * @param {string} key Identificador de la clave local.
     * @param {string} value Valor en formato cadena (típicamente JSON stringificado).
     */
    setItem(key, value) {
        // 1. Guardado instantáneo para fluidez absoluta de UI
        localStorage.setItem(key, value);

        // 2. Disparo asíncrono de sincronización
        this.triggerCloudSync(key, value).catch(err => {
            console.warn(`⚠️ Error temporal sincronizando [${key}] en la nube. Acción encolada para reintento.`, err);
        });
    }

    /**
     * Eliminación de clave local.
     * @param {string} key Identificador de la clave local.
     */
    removeItem(key) {
        localStorage.removeItem(key);
    }

    /**
     * Enruta y transforma la modificación local hacia la tabla PostgreSQL correspondiente.
     * @param {string} key Clave modificada.
     * @param {string} value Cadena de texto o JSON.
     */
    async triggerCloudSync(key, value) {
        if (!this.supabase) return;

        // Obtener usuario actual autenticado
        const { data: { session } } = await this.supabase.auth.getSession();
        const user = session?.user;

        // Si no hay usuario logueado, operamos de forma 100% local en modo invitado continuo
        if (!user) return;

        const userId = user.id;

        try {
            /**
             * MAPEO ESTRATÉGICO HACIA TABLAS SUPABASE
             */
            if (key === 'appOpeFavorites') {
                // Mapeo a user_question_data (is_favorite)
                const favorites = JSON.parse(value || '[]');
                // Procesamos el último delta o hacemos un barrido seguro
                // Para simplificar y asegurar, hacemos un volcado estructurado
                for (const hash of favorites) {
                    await this.supabase.from('user_question_data').upsert({
                        user_id: userId,
                        question_hash: hash,
                        is_favorite: true,
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'user_id, question_hash' });
                }
            } 
            else if (key === 'appOpeNotes') {
                const notesMap = JSON.parse(value || '{}');
                for (const [hash, note] of Object.entries(notesMap)) {
                    await this.supabase.from('user_question_data').upsert({
                        user_id: userId,
                        question_hash: hash,
                        user_note: note,
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'user_id, question_hash' });
                }
            }
            else if (key === 'appOpeQuestionStats') {
                const statsMap = JSON.parse(value || '{}');
                // Almacena analíticas individuales de visualización
                for (const [hash, stats] of Object.entries(statsMap)) {
                    await this.supabase.from('user_question_stats').upsert({
                        user_id: userId,
                        question_hash: hash,
                        seen_count: stats.seen || 0,
                        correct_count: stats.correct || 0,
                        wrong_count: stats.wrong || 0,
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'user_id, question_hash' });
                }
            }
            else if (key === 'antigravity_failures') {
                const failuresMap = JSON.parse(value || '{}');
                for (const [hash, count] of Object.entries(failuresMap)) {
                    await this.supabase.from('user_question_stats').upsert({
                        user_id: userId,
                        question_hash: hash,
                        failures_count: count,
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'user_id, question_hash' });
                }
            }
            else if (key === 'antigravity_last_seen_test') {
                const lastSeenMap = JSON.parse(value || '{}');
                for (const [hash, testIndex] of Object.entries(lastSeenMap)) {
                    await this.supabase.from('user_question_stats').upsert({
                        user_id: userId,
                        question_hash: hash,
                        last_seen_test_index: testIndex,
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'user_id, question_hash' });
                }
            }
            else if (key === 'ope_achievements') {
                const achievements = JSON.parse(value || '[]');
                for (const achId of achievements) {
                    await this.supabase.from('user_achievements').upsert({
                        user_id: userId,
                        achievement_id: achId,
                        unlocked_at: new Date().toISOString()
                    }, { onConflict: 'user_id, achievement_id' });
                }
            }
            else if (key === 'antigravity_test_counter' || key === 'ope_streak') {
                // Actualiza estadísticas globales en el perfil del usuario
                const totalTests = parseInt(localStorage.getItem('antigravity_test_counter') || '0', 10);
                const streakData = JSON.parse(localStorage.getItem('ope_streak') || '{}');
                
                await this.supabase.from('user_profiles').update({
                    current_streak: streakData.count || 0,
                    last_active_date: streakData.lastDate || '',
                    total_tests_completed: totalTests
                }).eq('user_id', userId);
            }
        } catch (error) {
            // Guardar acción fallida en cola persistente si hay un problema temporal de red o base de datos
            this.enqueueSyncQueue({ key, value, timestamp: new Date().toISOString() });
            throw error;
        }
    }

    /**
     * Guarda una operación fallida en la cola local para reintentarse cuando vuelva la conexión.
     */
    enqueueSyncQueue(action) {
        this.syncQueue.push(action);
        localStorage.setItem('ope_sync_queue', JSON.stringify(this.syncQueue));
    }

    /**
     * Procesa secuencialmente las peticiones atrasadas de la cola offline.
     */
    async processSyncQueue() {
        if (!navigator.onLine || this.isSyncing || this.syncQueue.length === 0 || !this.supabase) return;
        
        this.isSyncing = true;
        const currentQueue = [...this.syncQueue];
        
        for (const item of currentQueue) {
            try {
                await this.triggerCloudSync(item.key, item.value);
                // Si triunfa, sacarlo de la cola original
                this.syncQueue = this.syncQueue.filter(q => q.timestamp !== item.timestamp);
                localStorage.setItem('ope_sync_queue', JSON.stringify(this.syncQueue));
            } catch (e) {
                console.warn('Reintento de sincronización fallido, se mantendrá en cola.', e);
                break; // Detener reintentos si persiste la caída
            }
        }
        this.isSyncing = false;
    }

    /**
     * Consolida los datos desde la nube (Pull) al iniciar sesión o cargar en un nuevo dispositivo.
     * Sobrescribe de forma inteligente la caché local para unificar el progreso.
     */
    async pullAndConsolidateCloudState() {
        if (!this.supabase) return;
        const { data: { session } } = await this.supabase.auth.getSession();
        const user = session?.user;
        if (!user) return;

        console.log('🔄 Descargando e integrando progreso desde Supabase...');
        const userId = user.id;

        try {
            // 1. Cargar datos globales del perfil
            const { data: profile } = await this.supabase.from('user_profiles').select('*').eq('user_id', userId).single();
            if (profile) {
                if (profile.total_tests_completed) {
                    localStorage.setItem('antigravity_test_counter', profile.total_tests_completed.toString());
                }
                if (profile.current_streak) {
                    localStorage.setItem('ope_streak', JSON.stringify({
                        count: profile.current_streak,
                        lastDate: profile.last_active_date || ''
                    }));
                }
            }

            // 2. Cargar Favoritos y Notas
            const { data: qData } = await this.supabase.from('user_question_data').select('*').eq('user_id', userId);
            if (qData) {
                const favorites = qData.filter(row => row.is_favorite).map(row => row.question_hash);
                const notesMap = {};
                qData.forEach(row => {
                    if (row.user_note) notesMap[row.question_hash] = row.user_note;
                });
                localStorage.setItem('appOpeFavorites', JSON.stringify(favorites));
                localStorage.setItem('appOpeNotes', JSON.stringify(notesMap));
            }

            // 3. Cargar Estadísticas Individuales de Preguntas
            const { data: qStats } = await this.supabase.from('user_question_stats').select('*').eq('user_id', userId);
            if (qStats) {
                const statsMap = {};
                const failuresMap = {};
                const lastSeenMap = {};

                qStats.forEach(row => {
                    statsMap[row.question_hash] = {
                        seen: row.seen_count || 0,
                        correct: row.correct_count || 0,
                        wrong: row.wrong_count || 0
                    };
                    if (row.failures_count > 0) failuresMap[row.question_hash] = row.failures_count;
                    if (row.last_seen_test_index > 0) lastSeenMap[row.question_hash] = row.last_seen_test_index;
                });

                localStorage.setItem('appOpeQuestionStats', JSON.stringify(statsMap));
                localStorage.setItem('antigravity_failures', JSON.stringify(failuresMap));
                localStorage.setItem('antigravity_last_seen_test', JSON.stringify(lastSeenMap));
            }

            // 4. Cargar Logros
            const { data: achievements } = await this.supabase.from('user_achievements').select('*').eq('user_id', userId);
            if (achievements) {
                const achList = achievements.map(row => row.achievement_id);
                localStorage.setItem('ope_achievements', JSON.stringify(achList));
            }

            console.log('✅ Estado consolidado perfectamente en memoria local.');
            // Disparar evento a la UI para repintar si estamos en pantalla activa
            window.dispatchEvent(new CustomEvent('cloudStateSynced'));
        } catch (err) {
            console.error('Error durante la descarga consolidada de datos:', err);
        }
    }

    /**
     * MÉTODOS OFICIALES DE INTERFAZ DE USUARIO (FASE 4)
     */
    async loginWithGoogle() {
        if (!this.supabase) return { error: 'Servicio no disponible' };
        // Al usar OAuth con Supabase en cliente web, redirige al proveedor automáticamente
        const { data, error } = await this.supabase.auth.signInWithOAuth({ 
            provider: 'google',
            options: {
                redirectTo: window.location.origin + window.location.pathname
            }
        });
        return { data, error };
    }

    async loginWithEmail(email, password) {
        if (!this.supabase) return { error: 'Servicio no disponible' };
        const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
        if (!error) {
            await this.pullAndConsolidateCloudState();
        }
        return { data, error };
    }

    async registerWithEmail(email, password) {
        if (!this.supabase) return { error: 'Servicio no disponible' };
        const { data, error } = await this.supabase.auth.signUp({ email, password });
        if (!error && data.user) {
            // Tras registrarse con éxito, forzamos la subida de todo el historial local
            const mergedCount = await this.pushEntireLocalStateToCloud();
            // Disparamos un evento específico para notificar la fusión exitosa
            window.dispatchEvent(new CustomEvent('cloudDataMerged', { detail: { count: mergedCount } }));
            await this.pullAndConsolidateCloudState();
        }
        return { data, error };
    }

    /**
     * Sube masivamente todo el historial local acumulado hacia la nueva cuenta en Supabase.
     * Garantiza que el usuario no pierda el trabajo hecho anónimamente.
     */
    async pushEntireLocalStateToCloud() {
        console.log('☁️ Iniciando subida/fusión masiva de datos locales a Supabase...');
        const keysToSync = [
            'appOpeFavorites',
            'appOpeNotes',
            'appOpeQuestionStats',
            'antigravity_failures',
            'antigravity_last_seen_test',
            'ope_achievements',
            'antigravity_test_counter',
            'ope_streak'
        ];
        
        let totalItemsMerged = 0;
        for (const key of keysToSync) {
            const val = localStorage.getItem(key);
            if (val) {
                try {
                    await this.triggerCloudSync(key, val);
                    if (key === 'appOpeFavorites') {
                        const parsed = JSON.parse(val);
                        if (Array.isArray(parsed)) totalItemsMerged += parsed.length;
                    }
                } catch (e) {
                    console.warn(`Aviso subiendo clave local [${key}] durante fusión:`, e);
                }
            }
        }
        console.log(`✅ Fusión completada con éxito. Elementos favoritos sincronizados: ${totalItemsMerged}`);
        return totalItemsMerged;
    }

    /**
     * MÉTODOS DE DEPURACIÓN Y PRUEBA RÁPIDA DESDE CONSOLA
     */
    async loginTestUser(email, password) {
        if (!this.supabase) return console.error('Supabase no inicializado.');
        const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
        if (error) {
            console.error('❌ Error iniciando sesión de prueba:', error.message);
            console.log('Intentando registrar usuario de pruebas automáticamente...');
            const { data: regData, error: regErr } = await this.supabase.auth.signUp({ email, password });
            if (regErr) return console.error('❌ Error registrando:', regErr.message);
            console.log('✅ Usuario registrado y logueado con éxito:', regData.user?.email);
            await this.pushEntireLocalStateToCloud();
            await this.pullAndConsolidateCloudState();
            return regData;
        }
        console.log('✅ Sesión iniciada con éxito en Supabase:', data.user?.email);
        await this.pullAndConsolidateCloudState();
        return data;
    }

    async logout() {
        if (!this.supabase) return;
        await this.supabase.auth.signOut();
        console.log('👋 Sesión cerrada en Supabase.');
        window.dispatchEvent(new CustomEvent('cloudStateSynced'));
    }

    /**
     * Cierra la sesión activa, elimina inmediatamente las claves locales asociadas
     * e informa al usuario sobre el borrado completo de su perfil en la nube.
     */
    async deleteUserAccount() {
        console.log('🗑️ Solicitada eliminación local y remota de la cuenta de usuario...');
        let userEmail = '';
        if (this.supabase) {
            const { data: { session } } = await this.supabase.auth.getSession();
            if (session?.user) userEmail = session.user.email;
            await this.supabase.auth.signOut();
        }

        // Borrado integral de las claves de la aplicación del localStorage
        const keysToRemove = [
            'appOpeFavorites',
            'appOpeNotes',
            'appOpeQuestionStats',
            'antigravity_failures',
            'antigravity_last_seen_test',
            'ope_achievements',
            'antigravity_test_counter',
            'ope_streak'
        ];
        keysToRemove.forEach(k => localStorage.removeItem(k));

        console.log('✅ Historial local purgado por completo.');
        
        // Disparamos un repintado general para refrescar la UI
        window.dispatchEvent(new CustomEvent('cloudStateSynced'));

        // Mostramos el aviso/confirmación interactiva sobre la cuenta de backend
        setTimeout(() => {
            alert(`🗑️ Supresión Local Completada.\n\nSe ha cerrado tu sesión y borrado de inmediato todo tu historial en este dispositivo.\n\nPara completar el derecho de supresión de tu perfil en el servidor en la nube, puedes enviar un aviso al Responsable (Imanol Ekaitz) en imanoleka@gmail.com${userEmail ? ` con tu cuenta: ${userEmail}` : ''}.`);
            const infoBtn = document.getElementById('infoToStartBtn');
            if (infoBtn) infoBtn.click();
        }, 300);
    }
}

// Instanciar y exponer globalmente como sustituto nativo
window.appStorage = new StorageService();
