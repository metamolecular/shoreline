#Shoreline - A Google Closure Project Template

[Google Closure](http://code.google.com/closure/) is a suite of tools for creating advanced JavaScript software. Unfortunately, Closure's complexity makes it very difficult to even start a project. That's where Shoreline comes in.

## Installation

The following commands will install Shoreline and all dependencies.

1.  $ git clone git@github.com:metamolecular/shoreline.git
2.  $ cd shoreline
3.  $ git submodule init
4.  $ git submodule update
5.  $ npm install jake

## Built-In Tasks

For a complete list of Jake tasks:

$  jake -T

Shoreline's built-in Jake task include:

$  jake

Builds your project's dependency file. Before testing a project in uncompiled mode, and after modifying the dependency tree in your project, you'll need to use this task.

$  jake compile

Compiles your project's source using aggressive optimizations. The result is a minified, obfuscated, single file created in your project's build directory.

$  jake autospec

On Macs running Safari, this task will automatically detect file changes and re-run the Jasmine test suite.

$  jake clean

Removes dependencies and compiled JavaScript.

## Running the Test Suite

Open the file specs/suite.html in any browser.

## Running the Demo

Open the file html/index.html in any browser.

## Dependencies

Shoreline uses these tools in addition to Closure:

-  [Jasmine](https://jasmine.github.io/). The Behavior-driven development testing framework for JavaScript. Installed with commands 3 & 4 under **Installation**.
-  [Node.js](http://nodejs.org/) Server-side JavaScript environment.
-  [Jake](http://cappuccino.org/discuss/2010/04/28/introducing-jake-a-build-tool-for-javascript/). The JavaScript build system based on Node.js. Installed with command 5 under **Installation**.

## JavaScript Style

Shoreline follows the [JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml) published by Google.

## Synchronizing Closure

Google regularly updates Closure via SVN. To keep current with the latest:

1.  $ cd lib/closure.js
2.  $ git checkout master
3.  $ git pull
4.  $ cd ../..

For information on creating and maintaining dependencies through Git, see [Chris Jean's description](http://chrisjean.com/2009/04/20/git-submodules-adding-using-removing-and-updating/). For information on setting up your own Git clone from the Closure SVN repository, see [Fork and synchronise Google Code Subversion repository into GitHub](http://stackoverflow.com/questions/796991/fork-and-synchronise-google-code-subversion-repository-into-github).

## Authors

-  [Richard Apodaca](http://codemonger.tumblr.com/)

## Copyright

Copyright (C) 2007-2011 [Metamolecular, LLC](http://metamolecular.com). All rights reserved. Licensed under the MIT License. See the file 'LICENSE' for details.
