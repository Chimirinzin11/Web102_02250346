const users = [
  {
    id: '1',
    username: 'traveler',
    email: 'traveler@example.com',
    password: 'password123',
    full_name: 'Karma',
    profile_picture: 'https://example.com/profiles/traveler.jpg',
    bio: 'Travel photographer',
    created_at: '2023-01-15'
  },
  {
    id: '2',
    username: 'foodie',
    email: 'foodie@example.com',
    password: 'password123',
    full_name: 'Alex Johnson',
    profile_picture: 'https://example.com/profiles/foodie.jpg',
    bio: 'Food lover and chef',
    created_at: '2023-02-20'
  },
  {
    id: '3',
    username: 'fitness_guru',
    email: 'fitness@example.com',
    password: 'password123',
    full_name: 'Sam Wilson',
    profile_picture: 'https://example.com/profiles/fitness.jpg',
    bio: 'Fitness coach and wellness advocate',
    created_at: '2023-03-10'
  }
];

const posts = [
  {
    id: '1',
    caption: 'Beautiful sunset in Bali!',
    image: 'https://example.com/posts/bali-sunset.jpg',
    user_id: '1',
    created_at: '2023-03-01'
  },
  {
    id: '2',
    caption: 'Homemade pasta from scratch',
    image: 'https://example.com/posts/pasta.jpg',
    user_id: '2',
    created_at: '2023-03-05'
  },
  {
    id: '3',
    caption: 'Morning workout complete!',
    image: 'https://example.com/posts/workout.jpg',
    user_id: '3',
    created_at: '2023-03-08'
  },
  {
    id: '4',
    caption: 'Exploring the temples of Kyoto',
    image: 'https://example.com/posts/kyoto.jpg',
    user_id: '1',
    created_at: '2023-03-12'
  }
];

const comments = [
  {
    id: '1',
    text: 'Stunning view! Where exactly was this?',
    user_id: '2',
    post_id: '1',
    created_at: '2023-03-02'
  },
  {
    id: '2',
    text: 'I need to visit Bali someday!',
    user_id: '3',
    post_id: '1',
    created_at: '2023-03-02'
  },
  {
    id: '3',
    text: 'That looks delicious! Recipe please?',
    user_id: '1',
    post_id: '2',
    created_at: '2023-03-06'
  },
  {
    id: '4',
    text: 'Goals! What is your workout routine?',
    user_id: '2',
    post_id: '3',
    created_at: '2023-03-09'
  }
];

const likes = [
  {
    id: '1',
    user_id: '2',
    post_id: '1',
    created_at: '2023-03-02'
  },
  {
    id: '2',
    user_id: '3',
    post_id: '1',
    created_at: '2023-03-03'
  },
  {
    id: '3',
    user_id: '1',
    post_id: '2',
    created_at: '2023-03-06'
  },
  {
    id: '4',
    user_id: '3',
    post_id: '2',
    created_at: '2023-03-07'
  }
];

const followers = [
  {
    id: '1',
    follower_id: '2',
    following_id: '1',
    created_at: '2023-02-25'
  },
  {
    id: '2',
    follower_id: '3',
    following_id: '1',
    created_at: '2023-03-01'
  },
  {
    id: '3',
    follower_id: '1',
    following_id: '2',
    created_at: '2023-03-05'
  }
];

module.exports = { users, posts, comments, likes, followers };