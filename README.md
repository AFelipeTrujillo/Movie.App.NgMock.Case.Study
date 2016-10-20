## Karma, Jasmine & ngMock

### Jasmine
[Jasmine Home Page](http://jasmine.github.io/pages/docs_home.html) 

```
https://github.com/jasmine/jasmine/releases/download/v2.5.2/jasmine-standalone-2.5.2.zip
unzip jasmine-standalone-2.5.2.zip
```

### Karma

Install node and npm, previously.

```
npm init
npm i karma --save-dev
npm i kama-cli -g 
npm i karma-jasmine karma-chrome-launcher --save-dev
```

#### Deploy
```
karma init
> jasmine
> no
> Chrome
> src/**/*.js
> spec/**/*.js
>
> yes
```

That creates _karma.conf.js_, and runngin.
```
karma start karma.conf.js
```