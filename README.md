# PDF Merge

#### Video Demo: <URL HERE>

#### Deployed website (with Vercel) : https://pdf-merge.vercel.app/

#### Description:

This project is a next js web app and is also my final project for cs50 program.

I spent 1 day and a half doing this website. I spent most of my time finding out how the packages I use work.

Here are the following packages I used and why :

##### "@chakra-ui/react": "^1.6.5"

Chakra-ui is a library which helps me dealing with the item disclosure. I could have used a state in that case but using a library helps me understand the doc of a package better.

##### "@emotion/react": "^11.4.0"

Mandatory for Chakra-ui

##### "@emotion/styled": "^11.3.0"

Mandatory for Chakra-ui

##### "@headlessui/react": "^1.3.0"

Headlessui is the animation package built by Tailwind's team. It's a growing package which offers you many transitions and js plugin like modals (the one I use here)

##### "framer-motion": "^4.1.17"

Mandatory for Chakra-ui

##### "lodash": "^4.17.21"

This library is such a friend and help you dealing with objects and arrays.
I used it here because I needed a UUID generator for my js map function. We cannot use index for an iteration in React. It's a bad habit we must avoid because indexes can change.

##### "next": "11.0.1"

The framework I use.

##### "pdf-merger-js": "^3.2.0"

The core of the project. It helps me dealing with PDF without going deeply into PDF documents.

##### "react": "17.0.2"

Mandatory in any React project

##### "react-dom": "17.0.2"

Mandatory in any React project

##### "react-hook-form": "^7.12.1"

It's a very good package which helps you with forms errors and states. It allows you to transfer your state in your whole form without passing props in all your components and removes the states.
It gives you more readability.

##### "react-toastify": "^7.0.4"

This packages handles the notifications for you. No need to take care of the animation or anything else...

##### "autoprefixer": "^10.3.1"

Mandatory with Tailwind

##### "eslint": "7.31.0"

Pre-installed when running a new nextjs project

##### "eslint-config-next": "11.0.1",

Pre-installed when running a new nextjs project

##### "postcss": "^8.3.6",

Mandatory with tailwind

##### "tailwindcss": "^2.2.7"

This packages helps you with all the styles in your app.
This packages removes all the troubles you have finding what goes for firefox, what goes with chrome or whatever.

### Introduction

Hi, I'm Yann a belgian junior front-end developper working for a small company (Embie) based in Brussels. I'm 23 years old and I live in Falaen, a beautiful village near Dinant.
I decided to do a Next project because I needed to do more frontend on my own and doing a whole project on my own is an accomplishement. Dealing with such packages and making it work is such an accomplishement to me.

### Why NextJs

NextJs is an easy to use framework which takes the best of React and improve it in a better way.
It's also easy to use and to deploy with Vercel.

### How did I proceed

I firstly created the project with the

```shell
npx create-next-app
```

I then took care of the basic design with the colors with Tailwindcss

Next step was the form. I firstly created a basic form then I implemented React Hook Form.
When the basic was done, I put a modal to challenge myself and ask the user for a new filename.

The longest part was then to implement the PDF merge package. I first used `PDF-LIB` which was a pain in the ass to use. I moved to pdf `pdf-merger-js` because it was easer to use. This packages takes care of reading and merge the file the inputs receive from the user from A to Z.
I firstly thought PDF-LIB was a better solution because I was thinking it could offer me more possibilities but I was already stuck when I tried merge files.

Lastly, I installed `React-Totsify` to take care of the notifications on success.

### One last thing

I didn't split my functions very well neither the files because I knew the file didn't need it. As long as I knew it was the only use for this project, I didn't need to take more time trying to reduce the functions or split the files.
