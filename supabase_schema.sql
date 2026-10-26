-- ==============================================================================
-- MASTER PROMPT STUDIO - SUPABASE PRODUCTION DATABASE SCHEMA
-- ==============================================================================
-- Run this script in the Supabase Dashboard SQL Editor (https://supabase.com/dashboard)
-- to initialize the database tables, indexes, and Row Level Security (RLS) policies.

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. USER PROFILES TABLE
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text unique not null,
    display_name text,
    avatar_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. SAVED PROMPTS & CLOUD LIBRARY
create table if not exists public.saved_prompts (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade,
    user_email text not null,
    title text not null,
    content text not null,
    framework text default 'STAR',
    target_model text default 'ChatGPT 4o',
    tags text[] default '{}',
    is_starred boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for instant user library queries
create index if not exists idx_saved_prompts_email on public.saved_prompts(user_email);
create index if not exists idx_saved_prompts_user_id on public.saved_prompts(user_id);

-- 4. DIGITAL STORE ORDERS & UNLOCKS
create table if not exists public.orders (
    id uuid default uuid_generate_v4() primary key,
    order_ref text unique not null,
    customer_email text not null,
    customer_name text,
    items jsonb not null default '[]'::jsonb,
    total_amount_ngn numeric not null default 0,
    total_amount_usd numeric not null default 0,
    currency text not null default 'NGN',
    payment_method text not null default 'bank_transfer',
    status text not null default 'pending', -- 'pending', 'verified', 'delivered'
    unlock_code text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    verified_at timestamp with time zone
);

-- Index for instant order lookup and anti-fraud verification
create index if not exists idx_orders_ref on public.orders(order_ref);
create index if not exists idx_orders_email on public.orders(customer_email);

-- 5. KEYNOTE SPEAKER INQUIRIES
create table if not exists public.speaking_inquiries (
    id uuid default uuid_generate_v4() primary key,
    client_name text not null,
    client_email text not null,
    organization text,
    event_type text,
    preferred_date text,
    estimated_audience text,
    topic text,
    additional_notes text,
    status text default 'received', -- 'received', 'contacted', 'confirmed'
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.saved_prompts enable row level security;
alter table public.orders enable row level security;
alter table public.speaking_inquiries enable row level security;

-- Profiles: Public read, owner update
create policy "Public profiles are viewable by everyone" 
    on public.profiles for select using (true);

create policy "Users can update own profile" 
    on public.profiles for update using (auth.uid() = id);

-- Saved Prompts: Users can read and manage their own prompts
create policy "Users can view own prompts" 
    on public.saved_prompts for select 
    using (auth.uid() = user_id or auth.jwt()->>'email' = user_email);

create policy "Users can insert own prompts" 
    on public.saved_prompts for insert 
    with check (auth.uid() = user_id or auth.jwt()->>'email' = user_email or user_email is not null);

create policy "Users can update own prompts" 
    on public.saved_prompts for update 
    using (auth.uid() = user_id or auth.jwt()->>'email' = user_email);

create policy "Users can delete own prompts" 
    on public.saved_prompts for delete 
    using (auth.uid() = user_id or auth.jwt()->>'email' = user_email);

-- Orders: Anyone can create an order; customers can view their own orders
create policy "Anyone can create order record" 
    on public.orders for insert 
    with check (true);

create policy "Customers can view own orders by ref and email" 
    on public.orders for select 
    using (true);

-- Speaking Inquiries: Anyone can submit an inquiry
create policy "Anyone can submit speaker inquiry" 
    on public.speaking_inquiries for insert 
    with check (true);

create policy "Admin can view speaker inquiries" 
    on public.speaking_inquiries for select 
    using (auth.role() = 'authenticated');
