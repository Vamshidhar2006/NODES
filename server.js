
const express = require('express');
const app = express();

const courses = require('./data/courses');


app.set('view engine', 'ejs');


app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('pages/index');
});


app.get('/about', (req, res) => {
    res.render('pages/about');
});


app.get('/courses', (req, res) => {
    const search = req.query.search || '';

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(search.toLowerCase())
    );

    res.render('pages/courses', {
        courses: filteredCourses,
        search: search
    });
});


app.get('/courses/:id', (req, res) => {
    const courseId = Number(req.params.id);

    const course = courses.find(c => c.id === courseId);

    if (!course) {
        return res.status(404).send('Course not found');
    }

    res.render('pages/course-detail', {
        course: course
    });
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
