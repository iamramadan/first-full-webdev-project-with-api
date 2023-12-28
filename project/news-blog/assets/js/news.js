export class News{
    constructor(url,apiKey,keyword){
        this.setKeyword(keyword) //set the keyword upon instantiation
        this.setBaseUrl(url)
        this.setApiKey(apiKey)
    }

    //method to set the base url
    setBaseUrl(url){
        this.baseUrl = url
    }
    setApiKey(key){
        this.key=key
    }
    //method to set paramter for the url
    setParams(param){

    }
    // Method to set the keyword prop
    setKeyword(keyword){
        this.keyword = keyword
    }
    getKeyword(){
        return this.keyword
    }

    getUrl(){
        return this.baseUrl
    }
    getApiKey(){
        return this.key
    }

    getNewsList(){
        const url = this.getUrl() + '&q='+this.getKeyword()
        
        const response = fetch(url,{
            method: 'get',
            headers: {
                'Authorization' : `${this.getApiKey()}`
                
            }
        })
        .then(res => {return res.json()})
        .catch(err => err)
        this.newsList = response
        return response
        
        
    }

    getNewsDetail(title){
        const List = this.newsList //get the stroed news list
        return List.then(NewsList => {
            const News = NewsList
            
            const news = News.articles.filter(t => {
                return t.title == title
           })
           return news
        })
    }

    // Method to display the news list
    // this takes an argument of the target DOM
    displayNewsList(target){
        return new Promise(resolve => {
            target.innerHTML = 'loading'
            this.newsList.then(list => {
                const Articles = list.articles
                target.innerHTML = ''
                Articles.map(article => {
                    target.innerHTML += this.showListTemplate(article)
                })
                resolve(target)
                
            })
           
        })
        
    }

    showListTemplate(Article){
        const img = (Article.urlToImage) ? Article.urlToImage : 'https://placehold.co/600x400'
        return `<div class="col-12 col-sm-6 col-md-3">
        <div class="card border-success" data-title="${Article.title}">
            <div class="card-header p-0">
                <a href="#">
                    <img src="${img}" class="openModal w-100" alt="">
                </a>
            </div>
            <div class="card-body">
                <h2 class="openModal title h6"><a title="${Article.title}">${Article.title.substr(0,40)}</a></h2>
            </div>
            <div class="card-footer">
                <div class="row g-2">
                    <div class="col-12 col-xl-6 author">
                        <i class="fa fa-user" aria-hidden="true"></i>
                        <span>${Article.author ? Article.author.substr(0,30) : 'Nill'}</span>
                    </div>
                    <div class="col-12 col-xl-6 pub-date">
                        <i class="fa fa-calendar-o" aria-hidden="true"></i>
                        <span>${Article.publishedAt}</span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>`
    }

    pop(msg){
        this.getNewsDetail(msg).then(detail => console.log(detail))
        alert(msg)
    }

}