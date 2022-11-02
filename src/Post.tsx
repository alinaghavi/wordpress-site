import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";
import { IPost } from "./App";

interface PostProps {
  post: IPost;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [media, setMedia] = useState<string>("");

  useEffect(() => {
    axios
      .get<any>(
        `https://sitology.ir/wp-json/wp/v2/media/${post.featured_media}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setMedia(response.data.guid.rendered);
      });
  }, []);

  return (
    <div key={post.id}>
      <div style={{ width: "100%", height: "400px", overflow: "hidden" }}>
        <img src={media} />
      </div>
      <h3>{post.title.rendered}</h3>
      <p>{post.excerpt.rendered}</p>
    </div>
  );
};

export default Post;
