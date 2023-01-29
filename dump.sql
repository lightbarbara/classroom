--
-- PostgreSQL database dump
--

-- Dumped from database version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.6 (Ubuntu 14.6-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: statusType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."statusType" AS ENUM (
    'bought',
    'on going',
    'failed'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: buyers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.buyers (
    id integer NOT NULL,
    name text NOT NULL,
    balance real NOT NULL,
    cpf character varying(11) NOT NULL
);


--
-- Name: buyers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.buyers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: buyers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.buyers_id_seq OWNED BY public.buyers.id;


--
-- Name: houses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.houses (
    id integer NOT NULL,
    cep character varying(8) NOT NULL,
    price real NOT NULL
);


--
-- Name: houses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.houses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: houses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.houses_id_seq OWNED BY public.houses.id;


--
-- Name: negotiations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.negotiations (
    id integer NOT NULL,
    "houseId" integer NOT NULL,
    "buyerId" integer NOT NULL,
    "realtorId" integer NOT NULL,
    status public."statusType" DEFAULT 'on going'::public."statusType" NOT NULL,
    rating text
);


--
-- Name: negotiations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.negotiations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: negotiations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.negotiations_id_seq OWNED BY public.negotiations.id;


--
-- Name: realtors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.realtors (
    id integer NOT NULL,
    name text NOT NULL,
    "salesCommission" real NOT NULL,
    cpf character varying(11) NOT NULL
);


--
-- Name: realtors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.realtors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: realtors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.realtors_id_seq OWNED BY public.realtors.id;


--
-- Name: buyers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.buyers ALTER COLUMN id SET DEFAULT nextval('public.buyers_id_seq'::regclass);


--
-- Name: houses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.houses ALTER COLUMN id SET DEFAULT nextval('public.houses_id_seq'::regclass);


--
-- Name: negotiations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.negotiations ALTER COLUMN id SET DEFAULT nextval('public.negotiations_id_seq'::regclass);


--
-- Name: realtors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.realtors ALTER COLUMN id SET DEFAULT nextval('public.realtors_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public._prisma_migrations VALUES ('21f14063-8236-45c2-b718-cf570bb5a03b', 'ffc98dd8c1aa068643462f319cbb2785192dcc5176aadcdea0affb5ef07e5168', '2023-01-28 23:28:25.832775-03', '20230128232540_feat_create_tables', NULL, NULL, '2023-01-28 23:28:25.776872-03', 1);
INSERT INTO public._prisma_migrations VALUES ('f3f43106-84b9-4bb3-89a0-0bbd3f2a330a', '6e2737c087c474ef1183e00de1727d4fba186d03027bfed75c6bd9305843985a', '2023-01-28 23:28:25.842498-03', '20230128233210_feat_buyers_email_unique', NULL, NULL, '2023-01-28 23:28:25.834258-03', 1);
INSERT INTO public._prisma_migrations VALUES ('87265a87-6909-4b6b-9423-864c36dfd254', 'b9d306833daa23befdc8df109971154f7ab8c8f30049f679f86091651b0ba6cc', '2023-01-28 23:28:25.85305-03', '20230129011645_fix_alter_realtor_table', NULL, NULL, '2023-01-28 23:28:25.844764-03', 1);
INSERT INTO public._prisma_migrations VALUES ('3c93ad9e-f7ff-419c-aa96-9837277ee45b', '09379120c44950c08403f633e6ab622e85106100888d6ae6150b6d934d1f8d0f', '2023-01-28 23:28:25.865334-03', '20230129013207_feat_taking_out_auth_validation', NULL, NULL, '2023-01-28 23:28:25.855103-03', 1);
INSERT INTO public._prisma_migrations VALUES ('a49c5992-15ae-463d-8ca3-c6d6f74f4480', 'ef5d05f436ca05c4a10c3d0b8c1e425c09ba3898782d0aef2d7b38ec9f46e11f', '2023-01-28 23:28:46.610539-03', '20230129022846_fix_add_unique_cpf_to_buyers_and_realtors', NULL, NULL, '2023-01-28 23:28:46.592901-03', 1);


--
-- Data for Name: buyers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.buyers VALUES (2, 'luisa', 60000, '23456789012');
INSERT INTO public.buyers VALUES (4, 'barbara', 40, '78901234567');
INSERT INTO public.buyers VALUES (5, 'barbara', 40, '89012345678');
INSERT INTO public.buyers VALUES (1, 'claudia', 40, '90123456789');


--
-- Data for Name: houses; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.houses VALUES (1, '21853580', 20000);
INSERT INTO public.houses VALUES (2, '21547980', 50000);
INSERT INTO public.houses VALUES (3, '21354657', 30000);


--
-- Data for Name: negotiations; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.negotiations VALUES (1, 1, 1, 1, 'failed', 'bad');
INSERT INTO public.negotiations VALUES (2, 2, 1, 3, 'on going', NULL);
INSERT INTO public.negotiations VALUES (4, 1, 2, 2, 'on going', 'bad');
INSERT INTO public.negotiations VALUES (5, 1, 5, 2, 'on going', 'bad');
INSERT INTO public.negotiations VALUES (6, 2, 5, 2, 'on going', 'bad');
INSERT INTO public.negotiations VALUES (7, 2, 5, 3, 'on going', 'bad');
INSERT INTO public.negotiations VALUES (8, 2, 4, 3, 'on going', 'bad');


--
-- Data for Name: realtors; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.realtors VALUES (1, 'bianca', 0.2, '45678901234');
INSERT INTO public.realtors VALUES (2, 'roberta', 0.1, '56789012345');
INSERT INTO public.realtors VALUES (3, 'clara', 0.15, '67890123456');


--
-- Name: buyers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.buyers_id_seq', 5, true);


--
-- Name: houses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.houses_id_seq', 3, true);


--
-- Name: negotiations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.negotiations_id_seq', 8, true);


--
-- Name: realtors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.realtors_id_seq', 3, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: buyers buyers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.buyers
    ADD CONSTRAINT buyers_pkey PRIMARY KEY (id);


--
-- Name: houses houses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.houses
    ADD CONSTRAINT houses_pkey PRIMARY KEY (id);


--
-- Name: negotiations negotiations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.negotiations
    ADD CONSTRAINT negotiations_pkey PRIMARY KEY (id);


--
-- Name: realtors realtors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.realtors
    ADD CONSTRAINT realtors_pkey PRIMARY KEY (id);


--
-- Name: buyers_cpf_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX buyers_cpf_key ON public.buyers USING btree (cpf);


--
-- Name: realtors_cpf_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX realtors_cpf_key ON public.realtors USING btree (cpf);


--
-- Name: negotiations negotiations_buyerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.negotiations
    ADD CONSTRAINT "negotiations_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES public.buyers(id);


--
-- Name: negotiations negotiations_houseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.negotiations
    ADD CONSTRAINT "negotiations_houseId_fkey" FOREIGN KEY ("houseId") REFERENCES public.houses(id);


--
-- Name: negotiations negotiations_realtorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.negotiations
    ADD CONSTRAINT "negotiations_realtorId_fkey" FOREIGN KEY ("realtorId") REFERENCES public.realtors(id);


--
-- PostgreSQL database dump complete
--

