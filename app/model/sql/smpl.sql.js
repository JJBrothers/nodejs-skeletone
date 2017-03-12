const escape              = require('mysql').escape;

module.exports = {
  select : (model) => {
    return `
      select *
      from sample
      where 1=1
      and col5 = ${escape(model.col5)}
      ${cond1(model)}`
  },

  transaction : (model) => {
    return `
      insert into sample(
        id,col1,col2,col3,col4,col5
      ) values(
        ${escape(model.id)}
        ,${escape(model.col1)}
        ,${escape(model.col2)}
        ,${escape(model.col3)}
        ,${escape(model.col4)}
        ,${escape(model.col5)}
      )`
  },

  select2 : (model) => {
    return `
      select * from sample where id = ${escape(model.id)}`
  },

  select3 : (model) => {
    return `
      select * from sample_rel where sample_id = ${escape(model.sample_id)}`
  }
}

function cond1(model){
  let phrase = '';
  if(model.col1){
    phrase += `and col1 = ${escape(model.col1)}`
  }
  return phrase;
}
//
// module.exports = (() => {
//   return {
//     select : (obj) => {
//       return `
//         select *
//         from sample
//         where 1=1
//         and col5 = ${escape(obj.col5)}
//         ${cond1(obj)}`
//     },
//
//     transaction : (obj) => {
//       return `
//         insert into sample(
//           id,col1,col2,col3,col4,col5
//         ) values(
//           ${escape(obj.id)}
//           ,${escape(obj.col1)}
//           ,${escape(obj.col2)}
//           ,${escape(obj.col3)}
//           ,${escape(obj.col4)}
//           ,${escape(obj.col5)}
//         )`
//     },
//
//     select2 : (obj) => {
//       return `
//         select * from sample where id = ${escape(obj.id)}`
//     },
//
//     select3 : (obj) => {
//       return `
//         select * from sample_rel where sample_id = ${escape(obj.sample_id)}`
//     }
//   }
// })()
//
// function cond1(obj){
//   let phrase = '';
//   if(obj.col1){
//     phrase += `and col1 = ${escape(obj.col1)}`
//   }
//   return phrase;
// }

// const queryBinder         = reqlib('/app/util/queryHelper/mysql/queryBinder');
//
// module.exports = (() => {
//   return {
//     select : (obj) => {
//       return queryBinder.bind(`
//         select *
//         from sample
//         where 1=1
//         and col5 = [col5]
//         ${cond1(obj)}
//       `
//       , obj
//     )},
//
//     transaction : (obj) => {
//       return queryBinder.bind(
//         `insert into sample(
//           id,col1,col2,col3,col4,col5
//         ) values(
//           [id],[col1],[col2],[col3],[col4],[col5]
//         )`
//         ,obj
//       )
//     },
//
//     select2 : (obj) => {
//       return queryBinder.bind(
//         `select * from sample where id = [id]`
//       ,obj)
//     },
//
//     select3 : (obj) => {
//       return queryBinder.bind(
//         `select * from sample_rel where sample_id = [sample_id]`
//       ,obj)
//     }
//   }
// })()
//
// function cond1(obj){
//   let phrase = '';
//   if(obj.col1){
//     phrase += 'and col1 = [col1]'
//   }
//   return phrase;
// }
