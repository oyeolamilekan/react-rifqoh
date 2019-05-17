// /**
//  * Copyright (c) 2018-present, A68, Inc.
//  *
//  * This source code is free
//  */

// import React, { Component } from "react";

// import CatDetail from "./choicesDetail";
// import PostData from "../data/posts.json";
// import axios from "axios";
// import url from "../url";

// class GenreList extends Component {
//   constructor(props) {
//     super(props);
    
//     this.state = {
//       genres: [],
//       counter: "",
//       from_genre: []
//     };

//     this.incr = this.incr.bind(this);
//     this.decr = this.decr.bind(this);
//   }

//   componentDidMount() {
//     axios
//       .get(`${url}/api/list`, {
//         params: {
//           user: localStorage.getItem("username")
//         }
//       })
//       .then(resp => {
//         this.setState({
//           genres: PostData,
//           from_genre: resp.data.res,
//           counter: resp.data.user_num
//         });
//       });
//       console.log(localStorage.getItem('is_commerce'))
//   }

//   incr() {
//     this.setState({
//       counter: this.state.counter + 1
//     });
//   }

//   decr() {
//     this.setState({
//       counter: this.state.counter - 1
//     });
//   }

//   render() {
//     const { genres, counter, from_genre } = this.state;
//     return (
//       <div className="col-md-6 offset-md-3">
//         {" "}
//         <div className="bg-white p-2 mt-10 rounded">
//           <h5 className="font-weight-light ml-1">
//             Choose your category: {counter}
//           </h5>
//           <ul className="tags">
//             {genres.map((genreList, index) => {
//               return (
//                 <div className="list-data" key={`list-data ${index + genreList.title} `}>
//                   <CatDetail
//                     genr={genreList}
//                     key={`post-l-ist-key ${index + genreList.title} `}
//                     counter={this.incr}
//                     hasIt={from_genre.includes(genreList.title)}
//                     decrement={this.decr}
//                   />
//                 </div>
//               );
//             })}
//           </ul>
//           {counter > 1 ? (
//             <a href="/" className="btn btn-dark btn-lg btn-block">
//               Next <i className="fa fa-arrow-right" />
//             </a>
//           ) : (
//             ""
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// export default GenreList;
