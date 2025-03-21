export interface PostInfo {
    id: number;
    post_url: string;
    facebook_post_id: string;
    description: string;
    thumbnail_url: string;
    like_count: number;
    share_count: number;
    comment_count: number;
    user_id: number;
    last_synced_at: string;
    published_at: string;
    created_at: string;
    updated_at: string;
}


export interface TopLikes {
    id: number;
    name: string;
    password: string;
    remember_token: string;
    avatar_url: string;
    email: string;
    facebook_id: string;
    avatar: string;
    hashtag: string;
    role: string;
    created_at: string;
    updated_at: string;
    agency_code: string;
    max_likes: number;
    posts: PostInfo[];
}

export interface TopShare {
    id: number;
    name: string;
    password: string;
    remember_token: string;
    avatar_url: string;
    email: string;
    facebook_id: string;
    avatar: string;
    hashtag: string;
    role: string;
    created_at: string;
    updated_at: string;
    agency_code: string;
    max_shares: number;
    posts: PostInfo[];
}
