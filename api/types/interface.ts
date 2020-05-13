export interface UsersInfo {
  ok?: boolean;
  user?: {
    id?: string;
    team_id?: string;
    name?: string;
    deleted?: boolean;
    color?: string;
    real_name?: string;
    tz?: string;
    tz_label?: string;
    tz_offset?: number;
    profile?: {
      avatar_hash?: string;
      status_text?: string;
      status_emoji?: string;
      real_name?: string;
      display_name?: string;
      real_name_normalized?: string;
      display_name_normalized?: string;
      email?: string;
      image_original?: string;
      image_24?: string;
      image_32?: string;
      image_48?: string;
      image_72?: string;
      image_192?: string;
      image_512?: string;
      team?: string;
    };
    is_admin?: boolean;
    is_owner?: boolean;
    is_primary_owner?: boolean;
    is_restricted?: boolean;
    is_ultra_restricted?: boolean;
    is_bot?: boolean;
    updated?: number;
    is_app_user?: boolean;
    has_2fa?: boolean;
  };
}

export interface VoteState {
  title?: {
    input_title?: {
      type?: string,
      value?: string
    }
  },
  description?: {
    input_description?: {
      type?: string,
      value?: string
    }
  },
  conversation?: {
    input_conversation?: {
      type?: string,
      selected_conversation?: string
    }
  },
  date?: {
    input_date?: {
      type?: string,
      selected_date?: string
    }
  },
  choices01?: {
    input_choices01?: {
      type?: string,
      value?: string
    }
  },
  choices02?: {
    input_choices02?: {
      type?: string,
      value?: string
    }
  },
  choices03?: {
    input_choices03?: {
      type?: string,
      value?: string
    }
  }
}