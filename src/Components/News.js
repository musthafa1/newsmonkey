/* eslint-disable react/no-typos */
import React, {useEffect, useState} from "react";
import NewsIteam from "./Newsiteam";
import Spinner from "./Spinner";
import PropTypes, { string } from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) =>  {
  const[articles, setArticles] = useState([])
  const[loading, setLoading] = useState(true)
  const[page, setPage] = useState(1)
  const[totalResults, setTotalresults] = useState(0)
  

  
  
  const captializeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  const updateNews = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props
      .country}&category=${props
      .category}&apiKey=72815de468134de5bc9739da929e7eec&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setLoading(false)
    setTotalresults(parsedData.totalResults)
  }
  useEffect(() =>{
    document.title = `${captializeFirstLetter(props.category)} -NewsMonkey`;
   updateNews();
  },[])
  
 const fetchMoreData = async () => {
   
   const url = `https://newsapi.org/v2/top-headlines?country=${props
   .country}&category=${props
    .category}&apiKey=72815de468134de5bc9739da929e7eec&page=${
      page+1}&pageSize=${props.pageSize}`;
      setPage(page+1)
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      setArticles(articles.concat(parsedData.articles))
      setTotalresults(parsedData.totalResults)
      
    };
  
  const handlePreviousClick = async () => {
    
    setPage(page-1);
    updateNews();
  };
 const handleNextClick = async () => {
    
    setPage(page+1)
    updateNews();
  };
  
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px", marginTop: '80px' }}>
          NewsMonkey --TopHeadlings
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength = {articles.length}
          next = {fetchMoreData}
          hasMore = {articles.length !== totalResults}
          loader = {<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {articles.map((element) => { return  <div className="col-md-4" key={element.url}>
                  <NewsIteam
                    title={element.title ? element.title : ""}
                    description={
                      element.description
                        ? element.description
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
            })} 
            </div>
            </div>
         </InfiniteScroll>
         </>
    )
  
}

News.defaultProps = {
  country: "in",
  pageSize: 10,
  category: "general"
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
};
export default News