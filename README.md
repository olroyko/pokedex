# Pokemon Go

Pokemon Go is an application to receive short information about pokemons. All pokemon's data  easily accessible through a modern RESTful Pokémon API - [pokeapi]. 

### Version
1.0.0

### Constraints 
Application uses Pokeapi V1. See documentation at [pokeapi docs]

### Branches
Repository holds two branches:
- gh-pages - distribution branch, try it at [here]
- master - branch for developing and testing

### Basic usage

  - After page loading you can see 12 pokemons
  - For every pokemon only image, name and types will be displayed
  - You can filter pokemons by types
  - Clicking the "Load more" button another chunk of pokemons will be loaded
  - Clicking the single pokemon it's details will be displayed

### Local installation for developing
You need [Node.js], and [Bower] installed
```sh
$ git clone https://github.com/olroyko/pokedex.git
$ npm init
$ bower init
```

### Gulp usage 
You can launch application locally by:
```
$ gulp serve
```
Another available gulp tasks see in "gulpfile.babel.js" file in project root

License
----

MIT

**Free Software, profit!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


   [pokeapi]: <http://pokeapi.co/>
   [Node.js]: <http://nodejs.org>
   [Bower]: <http://bower.io/>
   [pokeapi docs]: <http://pokeapi.co/docsv1/>
   [here]:<http://olroyko.github.io/pokedex>

