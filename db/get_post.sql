-- select p.title, p.content, u.username, u.profile_pic, u.year, u.make, u.model, u.location from posts p
-- join users u
-- on u.id = p.user_id
-- where p.id = $1

select row_to_json(p)
from(
    select po.id, user_id, title, content, topic_id, date, profile_pic,
        (
            select array_to_json(array_agg(row_to_json(r)))
            from (
                select *
                from replies
                join users on user_id = users.id
                where post_id = po.id
            )r
        ) replies
    from posts as po
    join users on po.user_id = users.id
    where po.id = $1
)p;
