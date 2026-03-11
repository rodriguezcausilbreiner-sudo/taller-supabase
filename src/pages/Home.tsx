// src/pages/Home.tsx
import { useTasks }          from '../hooks/useTasks'
import { usePresence }       from '../hooks/usePresence'
import { useAuthContext }    from '../context/AuthContext'
import { TaskForm }          from '../components/TaskForm'
import { TaskItem }          from '../components/TaskItem'
import { RealtimeIndicator } from '../components/RealtimeIndicator'
import { Link }              from 'react-router-dom'

export function Home() {
  const { tareas, loading, error, crearTarea, actualizarTarea, eliminarTarea } =
    useTasks()
  const { signOut }         = useAuthContext()
  const { onlineUsers }     = usePresence('sala-general')
  const conectado           = onlineUsers.length >= 0  // true si el hook montó correctamente

  if (loading) return <div>Cargando tareas...</div>
  if (error)   return <div style={{ color: 'red' }}>Error: {error}</div>

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>

      {/* —— Navbar —— */}
      <nav style={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '1.5rem',
        padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '10px' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to='/'>📝 Mis Tareas</Link>
          <Link to='/dashboard'>📊 Dashboard</Link>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <RealtimeIndicator conectado={conectado} />
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
            👥 {onlineUsers.length} en línea
          </span>
          <button onClick={signOut}>Salir</button>
        </div>
      </nav>

      {/* —— Contenido —— */}
      <h1>📝 Mis Tareas</h1>
      <TaskForm
        onCrear={(titulo, descripcion) => crearTarea({ titulo, descripcion }).then(() => {})}
      />

      {tareas.length === 0
        ? <p style={{ color: '#94a3b8' }}>No tienes tareas aún. ¡Crea una!</p>
        : tareas.map(t => (
          <TaskItem
            key={t.id} tarea={t}
            onActualizar={(id, completada) => actualizarTarea(id, { completada }).then(() => {})}
            onEliminar={eliminarTarea}
          />
        ))
      }

      <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
        | {tareas.filter(t => t.completada).length} / {tareas.length} completadas
      </p>
    </div>
  )
}