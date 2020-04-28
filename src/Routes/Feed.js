import React from "react"
import { Helmet } from "rl-react-helmet"
import styled from "styled-components"
import { gql } from "apollo-boost"
import { useQuery } from "react-apollo-hooks"
import Loader from "../Components/Loader"
import Post from "../Components/Post"

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`

export default () => {
  // 새로고침을 통해 로그인 시 seeFeed 에러 고치는 법
  // const count = localStorage.getItem("refresh_count") + 1
  // localStorage.setItem("refresh_count", count)
  // if (count === "01") {
  //   window.location.reload()
  // }

  const { data, loading } = useQuery(FEED_QUERY)
  return (
    <Wrapper>
      <Helmet>
        <title>Feed | Prismagram</title>
      </Helmet>
      {loading && <Loader />}
      {!loading &&
        data &&
        data.seeFeed &&
        data.seeFeed.map(post => (
          <Post
            key={post.id}
            id={post.id}
            location={post.location}
            caption={post.caption}
            user={post.user}
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            createdAt={post.createdAt}
          />
        ))}
    </Wrapper>
  )
}
