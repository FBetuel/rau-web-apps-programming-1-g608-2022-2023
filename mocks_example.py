def get_likes(post_id):
    # TODO: This is mocked. Implement real version.
    return 100


def get_posts(user_id):
    # TODO: This is mocked. Implement real version.
    return [1, 2, 3, 4]


def top_post(user_id):
    posts = get_posts(user_id)
    likes = []
    for post_id in posts:
        like = get_likes(post_id)
        likes.append(post_id, like)

    