Hexwar
======

Hexwar is a simple turn based, hexagon map, strategy game in the tradition of *Panzer
General*, [*Uniwar*](http://uniwar.com), and [Battle for Wesnoth](www.wesnoth.org).

It's backend is in Ruby on Rails, but most of game is written in pure javascript 
with jQuery. The graphics are taken from the excellent opensourced game 
[Battle for Wesnoth](http://svn.wesnoth.org/).

Setting Up Development Environment
----------------------------------

First, [install Ruby on Rails](http://guides.rubyonrails.org/getting_started.html)
or simply [for windows](http://railsinstaller.org/).

Next, you'll want to copy `config/database.yml.example` to plain ole `database.yml`.
The dev settings in there should be fine.

You'll also need to create a [Facebook App](https://developers.facebook.com/apps).  Set
the **Site URL** to *http://localhost:3000/*.  Copy `config/facebook.yml.example` and 
enter you app's data here.

Finally, from within your project directory, run :

 *   `bundle install` This should install all the dependencies.
 *   `rake db:migrate` This will create the schema of the database.
 *   `rake db:seed` This will add some seed data (for units and tiles) to your database.
 *   `rails s` This will start your test server!

Oh, and you might find it easiest to mark you accounts as admins. Use `rails dbconsole`
then run `UPDATE players SET admin=1`.  The reason you'll probably need this is there
are no seeded maps yet, and only admins can make new maps.

