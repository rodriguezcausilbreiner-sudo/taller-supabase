export type Database = {
  public: {
    Tables: {
      tareas: {
        Row: {
          id: string
          titulo: string
          descripcion: string | null
          completada: boolean
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          titulo: string
          descripcion?: string | null
          completada?: boolean
          user_id?: string
          created_at?: string
        }
        Update: {
          id?: string
          titulo?: string
          descripcion?: string | null
          completada?: boolean
          user_id?: string
          created_at?: string
        }
      }
    }
  }
}