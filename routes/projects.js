var express = require('express');
var router = express.Router();

/* GET projects page. */
router.get('/projects/:projectId', function(req, res, next) {

    /* Name of project */
    var projectId = req.params.projectId;

    /* Main data JSON file */
    var dataFile = req.app.get('appData');

    /* Array to store project data */
    var projectData = [];

    dataFile.projects.forEach(function(element) {

        /* Check if project id exists in data */
        if (element.id == projectId) {

            projectData.push({

                name: element.name,
                id: element.id,
                client: element.client,
                role: element.role,
                technologies: element.technologies,
                github: element.github,
                photos: element.photos,
                background: element.background,
                description: element.description

            });

        }

    });

    res.render('project', {
        title: 'Portfolio of Tony Nguyen',
        projectData: projectData
    });

});

module.exports = router;
