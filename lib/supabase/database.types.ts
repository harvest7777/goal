export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      goals: {
        Row: {
          created_at: string
          daily_commitment: number | null
          id: number
          is_focused: boolean
          motivator: string | null
          name: string
          owner: string | null
          weekly_commitment: number | null
        }
        Insert: {
          created_at?: string
          daily_commitment?: number | null
          id?: number
          is_focused?: boolean
          motivator?: string | null
          name: string
          owner?: string | null
          weekly_commitment?: number | null
        }
        Update: {
          created_at?: string
          daily_commitment?: number | null
          id?: number
          is_focused?: boolean
          motivator?: string | null
          name?: string
          owner?: string | null
          weekly_commitment?: number | null
        }
        Relationships: []
      }
      outputs: {
        Row: {
          created_at: string
          description: string
          id: number
          session_id: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          session_id: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          session_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "outputs_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: true
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      reflections: {
        Row: {
          created_at: string
          description: string
          id: number
          session_id: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          session_id: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          session_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "reflections_new_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: true
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      reflections_old: {
        Row: {
          created_at: string
          description: string
          goal_id: number | null
          id: number
          title: string | null
        }
        Insert: {
          created_at?: string
          description: string
          goal_id?: number | null
          id?: number
          title?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          goal_id?: number | null
          id?: number
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "steps_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          created_at: string
          end_time: string
          goal_id: number | null
          id: number
          start_time: string
        }
        Insert: {
          created_at?: string
          end_time: string
          goal_id?: number | null
          id?: number
          start_time: string
        }
        Update: {
          created_at?: string
          end_time?: string
          goal_id?: number | null
          id?: number
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_daily_time_over_range_of_days: {
        Args: {
          p_days: number
          p_end_time: string
          p_goal_id: number
          p_start_time: string
        }
        Returns: {
          day_time: number
        }[]
      }
      get_goal_owner: {
        Args: { goal_id: number }
        Returns: string
      }
      get_goals_worked_on_from_time_range: {
        Args: { "": number } | { p_end_time: string; p_start_time: string }
        Returns: {
          created_at: string
          daily_commitment: number | null
          id: number
          is_focused: boolean
          motivator: string | null
          name: string
          owner: string | null
          weekly_commitment: number | null
        }[]
      }
      get_hourly_time_over_range_of_hours: {
        Args:
          | { p_goal_id: number; p_hours: number; p_start_time: string }
          | { p_hours: number; p_start_time: string }
        Returns: {
          day_time: number
        }[]
      }
      get_non_cutoff_total: {
        Args:
          | { p_end_time: string; p_goal_id: number; p_start_time: string }
          | { p_end_time: string; p_start_time: string }
        Returns: number
      }
      get_roll_into_new_day_total: {
        Args:
          | { p_end_time: string; p_goal_id: number; p_start_time: string }
          | { p_end_time: string; p_start_time: string }
        Returns: number
      }
      get_roll_out_of_day_total: {
        Args:
          | { p_end_time: string; p_goal_id: number; p_start_time: string }
          | { p_end_time: string; p_start_time: string }
        Returns: number
      }
      get_session_data_from_time_range: {
        Args: { p_end_time: string; p_start_time: string }
        Returns: {
          goal_id: number
          goal_name: string
          output_description: string
          reflection_description: string
          session_end: string
          session_id: number
        }[]
      }
      get_session_owner: {
        Args: { p_session_id: number }
        Returns: string
      }
      get_sessions_from_range: {
        Args: { p_end_time: string; p_goal_id: number; p_start_time: string }
        Returns: {
          end_time: string
          goal_id: number
          session_id: number
          start_time: string
        }[]
      }
      get_total_time_spent_from_range: {
        Args:
          | { p_end_time: string; p_goal_id: number; p_start_time: string }
          | { p_end_time: string; p_start_time: string }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
