---
title: "What is Markdown?"
description: "An alternative way to style a text document for readability and portability."
image: /static/img/posts/robots-using-computer.jpg
date: "2023-03-17"
canonical_url: https://abdurashid.tech/chatgpt-content-generation
---

## Introduction

If you are looking for a simple way to create visually appealing text documents without using any fancy editors, check out Markdown. Invented by John Gruber and Aaron Swartz in 2004, Markdown provides a lightweight syntax to style any text document so that it can be converted to HTML for viewing and publishing.

## Differences between HTML and Markdown

Markdown translates to HTML, but Markdown is not a replacement for HTML. Markdown’s syntax can be converted to a small subset of HTML tags to do things like format text, add links, display images, and more. You can even incorporate HTML elements inside a Markdown document. To render Markdown in HTML, though, you would need a tool called a Markdown parser (more about this parser later on).

## Benefits of Using Markdown

Why would you use Markdown? Compared to HTML, writing text in Markdown is much faster because the syntax is simpler. The authors of Markdown intended Markdown to be a language for writing styled text with syntax that is just as easy to read as it is to write.

the problems I ran into are:

- bad understanding of the title and what the article should be about
- several nice to read sentences that don't bring any real value to the reader
- it wouldn't be easy to get into the style of the article if you decide to make it your own and edit it
- ChatGPT becomes slow working on more interesting topics but it is quite fast on trivial topics

For what I would consider an easy topic I actually got quite good content, but it seemed near impossible to try to generate content similar to the article I am writing.

### Title of My Document

Nice use case for ChatGPT is to generate error messages for your app, if you don't like thinking about a funny 404 prompt you can try the following:

<figure>
  <img src="/static/img/posts/chatgpt-404-text.png" alt="ChatGPT 404 page text">
</figure>

or if you don't want to think about how a particular HTTP status code should be handled, you can use ChatGPT to generate an error message for you as well:

<figure>
  <img src="/static/img/posts/chatgpt-503-error.png" alt="ChatGPT 503 error text">
</figure>

## Web applications serving HTML based on a template

Imagine you are working on a web app with several thousand of HTML pages dynamically generated based on templates. Often you might have static content that repeats across all HTML pages.

### Using ChatGPT to generate Spintax

Spintax (spinning syntax) is a content generation tactic using synonyms to produce variants with the same meaning.

One use case of ChatGPT is that it's able to generate spintax for you, this is extremely useful when you have a template that you use to render a large number of pages (think product details or a tourist activity).

For example, I have tried this prompt with ChatGPT:

> Give me a spintax of the following text: {Barcelona} is the best destination for your vacation. Everyone should visit once in their life.

the response I received:

> {Barcelona|The Catalan city|This Spanish gem|The cosmopolitan capital of Catalonia|The vibrant Mediterranean city} {is the ultimate|is the perfect|should be on top of your list for|should definitely be considered for} {your vacation|a memorable holiday}. {Everyone|Every traveler|All globe-trotters|Every adventurer} {should|must} {visit|experience} {at least once|at least one time|once in their lifetime}.

Furthermore, a Markdown document without any HTML tags can be published as is because its syntax is already made for easy viewing. For example, the following Markdown document has:

1. styled a heading underlined with equal signs (=),
2. emphasized week in bold with double asterisks (\*\*),
3. bulleted a list by prefacing each item with a number and a period,
4. and marked several lines as separate quotes with an angle bracket (>) per quote.

The HTML equivalent to the above would be:

<h1>My Todo List</h1>
<p>At the end of this <strong>week</strong>, I plan to:</p>
<ol>
  <li>Learn Markdown</li>
  <li>Write Markdown</li>
  <li>Share a Markdown note</li>
</ol>
<p>My favorite quote is:</p>
<blockquote>
  <p>
    If you didn't get it the first time<br>
    Do not despair<br>
    Try and try again<br>
    ~ Anonymous
  </p>
</blockquote>

## Conclusion

You’ve learned a lot about Markdown, specifically:

1. What Markdown is and how it differs from HTML
2. How you can benefit from Markdown
3. Where and when to apply Markdown in various scenarios
4. How to write Markdown to style your text and make it presentable
5. What a Markdown parser is and where to locate one
6. Where to find other flavors of Markdown that are used in industry

Amazing job getting this far! Don’t be shy in applying Markdown in your next document. In fact, this article and many others like this on Codecademy were prepared using Markdown! See? We practice what we preach.
