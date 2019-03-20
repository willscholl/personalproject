delete from replies
where post_id = $1;

delete from posts
where id = $1