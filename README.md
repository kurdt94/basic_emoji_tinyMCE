# basic_emoji_tinyMCE
TinyMCE basic Emoji plugin 

{{ OUTDATED, NO LONGER FUNCTIONAL IN tinyMCE v5, use NATIVE emoticons }}  

- this plugin let's you add Emoji to the tinyMCE content via a panelbutton. 
( similar to the existing emoticons plugin )

1) copy the emoji folder to the plugins directory

2) add the plugin and toolbar-button to your tinyMCE setup 

        tinymce.init({
            plugins: [
                'emoji'
            ],
            toolbar: 'emoji'
        });

note:
- when using sql be sure to have setup the database / tables / columns and environment to use utf8mb4 Character Set.
