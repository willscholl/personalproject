-- select p.title, p.content, u.username, u.profile_pic, u.year, u.make, u.model, u.location from posts p
-- join users u
-- on u.id = p.user_id
-- where p.id = $1

select row_to_json(p)
from(
    select id, user_id, title, content, topic_id,
        (
            select array_to_json(array_agg(row_to_json(r)))
            from (
                select *
                from replies
                where post_id = posts.id
            )r
        ) replies
    from posts
    where id = $1
)p
