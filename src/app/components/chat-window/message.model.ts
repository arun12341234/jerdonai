export interface Message {
     message_id: any;
      // id: string;             // Unique ID for the message
      parentId?: string | null; // Parent message ID for threading
      // text: string;           // Message content
      content: any;  // Add content as a property
      // sender: 'USER' | 'bot'; // Sender type
      role: string;
      // 'USER' | 'ASSISTANT'; // Sender type
      feedback?: 'like' | 'dislike'; // User feedback
      editMode?: boolean;     // For editing state
      isStreaming?: boolean;  // ✅ To track token streaming
      parent_id: null;
      model: string;
      thinking_enabled: boolean;
      thinking_content: null;
      thinking_elapsed_secs: null;
      ban_edit: boolean;
      ban_regenerate: boolean;
      status: string; 
      accumulated_token_usage: number; 
      files: never[]; 
      tips: never[]; 
      inserted_at: number; 
      search_enabled: boolean; 
      search_status: null; 
      search_results: null;
  }
  