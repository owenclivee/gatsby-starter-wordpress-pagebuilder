<h1 align="left">
  gatsby-starter-wordpress-pagebuilder
</h1>

**Currently a work in progress...**

This starter uses Wordpress + ACF to create a page builder set up, that include layouts with nested components. These dynamic layouts and nested components have been optimized via code splitting.
  

## WordPress Setup

1.  **Config.**

    In the project root there is a wordpress folder, which contains a twentynineteen child theme. Copy the child theme across to your local wordpress install, and activate it. Make sure you have the main wp [twentynineteen theme](https://en-gb.wordpress.org/themes/twentynineteen/).
    
    _The child theme contains the JSON for the component/layout acf fields. It also contains a functions.php, which hooks into wordpress to sync the acf fields, and also creates relative menu paths for Gatsby._    
    
    Create a `.env.development` file with a variable named `WORDPESS_URL` pointing to your local wordpress install. E.g `WORDPRESS_URL="http://mylocalwordpress.dev"`.


## Developing 

1.  **Start developing.**

    Given that the acf fields have synced correctly, you should be able to see the pagebuild acf field when creating your pages. You can now use this to add your layouts and nested components. 
    
    Try adding some dummy data and start up your gatsby dev server:

    ```shell
    cd gatsby-starter-wordpress-pagebuilder/
    gatsby develop
    ```
    
## Credits

I want to credit this great [article on Dev.to by Henrik Wirth.](https://dev.to/nevernull/overview-guide-to-gatsby-wordpress-starter-advanced-with-previews-i18n-and-more-583l) His [gatsby starter repo](https://github.com/henrikwirth/gatsby-starter-wordpress-advanced) served as the base and inspiration for this repo. Much of the code has been left untouched (hey, if it aint broke, don't fix it!), but I have built on his approach to the ACF pagebuilder. It's now possible to nest components within layouts, allowing for greater flexibility when creating pages.