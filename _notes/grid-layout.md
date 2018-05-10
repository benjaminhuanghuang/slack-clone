## CSS grid layout
- https://www.sitepoint.com/introduction-css-grid-layout-module/
CSS Grid Layout was supported by browser. Grid Layout Module adds a new value 'grid' to the display property.

Sample
```
HTML:

    <div class="app-layout">
    <div class="tweets">Tweets</div>
    <div class="replies">Replies</div>
    <div class="search">Search</div>
    <div class="messages">Messages</div>
    </div>

CSS to the .app-layout container:
    .app-layout {
        display: grid; /* 1 */
        grid-template-columns: 1fr 1fr 1fr 1fr; /* 2 */
        grid-template-rows: 100vh; /* 3 */
    }
1. Set the display property to grid.
2. Divide the container element into four columns, each column is 1fr (one fraction) of the free space within the grid container.
3. Create one row and set the height to be 100vh (full viewport height).

2 columns and 2 rows layout
    .app-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 50vh 50vh;
    }
```

Create the previous layout only on viewports under 1024px
```
    @media screen and (max-width: 1024px) {
    .app-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 50vh 50vh;
    }
    }
```

## Dependency
```
    npm i -S styled-components
```




