import React from 'react'

 const NewsIteam =(props) => {
  
    let {title, description, imageUrl, newsUrl,author,date,source} = props;
    return (
      <div>
        <div className="card">
          <div style={{display: 'flex',
        justifyContent: 'felx-end',
        position: 'absoulte',
        right: '0'}}>
        <span className= "badge rounded-pill bg-danger" >
    {source}
  </span>
  </div>
  <img src={imageUrl?imageUrl:"http://cdn.wionews.com/sites/default/files/2023/03/14/338589-untitled-design-2023-03-14t093743629.png"} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
  <p className="card-text"><small className="text-muted">By {author?author:"Unknow"} to {new Date(date).toGMTString()}</small></p>
    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read more</a>
  </div>
</div>
      </div>
    )
  
}
export default NewsIteam;

