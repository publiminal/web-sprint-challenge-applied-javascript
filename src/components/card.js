import axios from "axios";

const Card = ({ headline, authorPhoto, authorName, cat }) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  // console.log('CARD' )

  const card = document.createElement('div')
  const headLine = document.createElement('div')
  const author = document.createElement('div')
  const imgContainer = document.createElement('div')
  const img = document.createElement('img')
  const span = document.createElement('span')

  card.classList.add('card')
  headLine.classList.add('headline')
  author.classList.add('author')
  imgContainer.classList.add('img-container')
  // card.classList.add(cat)
  card.setAttribute('data-cat', cat)

  card.appendChild(headLine)
  card.appendChild(author)
  author.appendChild(imgContainer)
  imgContainer.appendChild(img)
  author.appendChild(span)
  // card.dataset.topicTitle = topicTitle

  headLine.textContent = headline
  img.src = authorPhoto
  span.textContent = `By ${authorName}`


  function onClickCard() {
    console.log('headline', headline)
    console.log('data cat', card.dataset.cat)
  }


  card.addEventListener('click', onClickCard)

  // card.listClass.add('card')
  // console.log('card ', card)
  return card
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
  // console.log('parent', parent.parentNode  )
  // parent.appendChild(Header({headline:'Lambda Times', authorPhoto:'JANUARY 6, 2021', authorName:'26°'} ))

  function displayArticleByTopic(topicTitle, articlesByTopic) {
    const parent = document.querySelector(selector)
    // console.log('displayArticleByTopic : articlesByTopic ', articlesByTopic)
    // const __topicTitle = topicTitle
    // console.log(articlesByTopic.length)
    articlesByTopic.forEach(article => {
      article.cat = topicTitle
      // console.log(`displayArticleByTopic ::  ${__topicTitle}:::::  `, article.headline )
      // console.log('displayArticleByTopic')
      // card = 
      // console.log('card', card ); 
      // parent.innerText = ''
      parent.appendChild(Card(article))

    })
  }

  function setCategoriesFilters(topicTitles) {
    const tabs = document.querySelectorAll('.tabs-container .topics .tab ')
    const cardsContainer = document.querySelector(selector)
    const cards = cardsContainer.children

    tabs.forEach(tab => {
      console.log('tab', tab.innerHTML)
      tab.addEventListener('click', ev => {
        console.log(ev.target.innerHTML)
        const topicFilter = ev.target.innerHTML
        Array.from(cards).forEach(card => {
          //  card.dataset.cat.includes(topicFilter)
          //  console.log(card.dataset.cat.includes(topicFilter))
          card.classList.add('card-transition')
          const isFiltered = topicFilter.includes(card.dataset.cat)
          // console.log('isFiltered', isFiltered)
          const opacityAttr = isFiltered  ? 1 : 0
          // card.setAttribute('opacity', opacityAttr)
          card.style.opacity = opacityAttr
          // console.log('filteredCards', filteredCards)
          // const displayAttr = isFiltered ? 'flex' : 'none'
          // card.style.display = displayAttr
          const visAttr = isFiltered ? 'initial' : 'hidden'
          card.style.visibility = visAttr
          
        })
      })
    })
  }


  function onDataSuccess({ data, status }) {
    console.log('onSucessAxios', status)
    /* render the Card component */
    // console.log('dataArticles', data.articles  );
    // console.log('data' , data )
    const topicTitles = Object.keys(data.articles)
    setCategoriesFilters(topicTitles)
    // console.log('topicTitles' , topicTitles )
    // console.log('topicTitles javascript' , data.articles[topicTitles[0]] )
    topicTitles.forEach(topicTitle => {
      const articlesByTopic = data.articles[topicTitle]
      articlesByTopic.cat = topicTitle
      // console.log('articlesByTopic.cat', articlesByTopic.cat )
      // console.log('articlesByTopic.headline', articlesByTopic.headline)
      // console.log(` --------- ArticlesByTopic ${topicTitle} ` , articlesByTopic)
      displayArticleByTopic(topicTitle, articlesByTopic)
    })

    const datasetTest = document.querySelectorAll()
  }

  function onDataFail({ response/* ,  message */ }) {
    console.log('onFailAxios', response)
  }

  function doCallArticles() {
    /* get external data  */
    axios.get('http://localhost:5000/api/articles')
      .then(res => onDataSuccess(res))
      .catch(err => onDataFail(err))
  }

  doCallArticles()



}

export { Card, cardAppender }






