SELECT post_id,COUNT(*) AS "number_of_replies",
    (
        select row_to_json(p)
        from(
            select * from posts p 
            join topics on topics.id = p.topic_id
            join users on users.id = user_id
            where p.id = post_id 
        ) p
    ) post 
FROM replies
join posts on posts.id = post_id
GROUP BY post_id
HAVING COUNT(*)>=2
ORDER BY COUNT(*) DESC
limit 5;