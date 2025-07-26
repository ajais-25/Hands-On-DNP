import React from "react";
import Post from "./Post";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
      error: null,
      hasError: false,
    };
  }

  loadPosts() {
    this.setState({ loading: true, error: null });

    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const posts = data.map(
          (post) => new Post(post.id, post.title, post.body)
        );
        this.setState({
          posts: posts,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        this.setState({
          error: error.message,
          loading: false,
          posts: [],
        });
      });
  }

  componentDidMount() {
    this.loadPosts();
  }

  render() {
    const { posts, loading, error, hasError } = this.state;

    if (hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong!</h2>
          <p>An unexpected error occurred while rendering the posts.</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="loading">
          <h2>Loading Posts...</h2>
          <p>Please wait while we fetch the latest posts.</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="error">
          <h2>Error Loading Posts</h2>
          <p>Error: {error}</p>
          <button onClick={() => this.loadPosts()}>Retry</button>
        </div>
      );
    }

    return (
      <div className="posts-container">
        <h1>Blog Posts</h1>
        <p>Total Posts: {posts.length}</p>
        <button onClick={() => this.loadPosts()}>Refresh Posts</button>

        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          <div className="posts-list">
            {posts.map((post) => (
              <div key={post.id} className="post-item">
                <h3>
                  Post #{post.id}: {post.title}
                </h3>
                <p>{post.body}</p>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  componentDidCatch(error, info) {
    console.error("Posts component error:", error, info);
    this.setState({
      hasError: true,
      error: error.message,
    });
  }
}

export default Posts;
