-- Drop table

-- DROP TABLE public.train;

CREATE TABLE public.train (
	execute_date timestamp with time zone NOT NULL,
	"type" int4 NOT NULL,
	count int4 NOT NULL,
	speed int4 NOT NULL,
	user_id varchar(100) NOT NULL
);
CREATE INDEX train_user_id_idx ON public.train (user_id,execute_date);
grant all on public.train to pushup;


