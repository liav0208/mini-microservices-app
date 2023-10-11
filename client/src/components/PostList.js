import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

import { useEffect, useState } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:4002/posts");

        setPosts(res.data);
      } catch (e) {
        console.log(e);
        setPosts({});
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="d-flex flex-row flex-row justify-content-between">
      {Object.values(posts).map((post) => {
        return (
          <div
            key={post.id}
            className="card"
            style={{ width: "30%", marginBottom: "20px" }}
          >
            <div className="card-body">
              <h3>{post.title}</h3>
              <CommentList comments={post.comments} />
              <CommentCreate postId={post.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
