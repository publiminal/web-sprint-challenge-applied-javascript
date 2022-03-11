const Header = (title, date, temp ) => {
  // TASK 1
  // ---------------------
  // Implement this function taking `title`, `date` and `temp` as its 3 args and returning the markup below.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  //
  //  <div class="header">
  //    <span class="date">{ date }</span>
  //    <h1>{ title }</h1>
  //    <span class="temp">{ temp }</span>
  //  </div>
  //
  const header  = document.createElement('div')
  const span1   = document.createElement('span')
  const h1      = document.createElement('h1')
  const span2   = document.createElement('span')

  header.appendChild(span1)
  header.appendChild(h1)
  header.appendChild(span2)

  header.classList.add('header')
  span1.classList.add('date')
  span2.classList.add('temp')
debugger
  span1.textContent = date
  h1.textContent = title
  span2.textContent = temp

  return header

  /* 
        const template = [
          {el:'div', attr:'header'},
          {el:'span', attr:'date', parent:'header', txt:`${date}` },
          {el:'h1', parent:'header', txt:`${title}` },
          {el:'span', attr:'temp', parent:'header', txt:`${temp}` }
        ]
  
        const newDOM = function (el){ return document.createElement(el) } // shorthand
        const markup = function(body){
          const container = newDOM('header') //main wrapper
          let tag = null
          body.forEach( ({el, attr, parent, txt}) => {
            tag = newDOM(el)
            if(attr){ tag.classList.add(attr) } 
            if(txt){ tag.textContent = txt  } 
            const selector = parent ? container.querySelector(`.${parent}`) : container
            selector.appendChild(tag)
          })
        const innerContent = container.querySelector('div') 
        // return innerContent
        return container //
      }
      return  markup(template) */
}

const headerAppender = (selector) => {
  // TASK 2
  // ---------------------
  // Implement this function taking a css selector as its only argument.
  // It should create a header using the Header component above, passing arguments of your choosing.
  // It should append the header to the element in the DOM that matches the given selector.
  //
  const parent = document.querySelector(selector)
  // console.log('parent', parent.parentNode  )
  parent.appendChild(Header( 'Lambda Times' ,'JANUARY 6, 2021','26°' ))
  // parent.appendChild(Header({title:'foo', date:'bar', temp:'baz'}) )
}

export { Header, headerAppender }
