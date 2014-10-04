'use strict';

/**
 * @ngdoc function
 * @name melodigeniAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the melodigeniAppApp
 */
angular.module('melodigeniAppApp')
    .controller('MainCtrl', function ($scope, $location, $sce, sr, lastfm) {
        var currentQuestion = 0;

        sr.getChannels().then(function(r) {
            $scope.channels = r;
        });

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex ;

            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        function getNextQuestion() {
            if (currentQuestion == 0) {
                lastfm.getArtistInfo($scope.currentlyPlaying.artist).then(function(r) {
                    console.log('Artist info: ', r);
                    generateQuestion('artistName', r);
                });
            } else if (currentQuestion == 1) {
                lastfm.getArtistInfo($scope.currentlyPlaying.artist).then(function(r) {
                    console.log('Artist info: ', r);
                    generateQuestion('yearFormed', r);
                });
            } else if (currentQuestion == 2) {
                lastfm.getArtistInfo($scope.currentlyPlaying.artist).then(function(r) {
                    console.log('Artist info: ', r);
                    generateQuestion('artistImage', r);
                });
            } else if (currentQuestion == 3) {
                lastfm.getArtistInfo($scope.currentlyPlaying.artist).then(function(r) {
                    console.log('Artist info: ', r);
                    $scope.artistResult = r;
                });
            }

            currentQuestion++;
        }

        var alreadyRandomizedNumbers = [];

        function getRandomYear(answers, originalYear) {
            originalYear = parseInt(originalYear);
            var tempNumber = Math.floor((Math.random()*10)-5);
            var tempYear = parseInt(originalYear + tempNumber);
            var year = parseInt(new Date().getFullYear());

            if (!!~alreadyRandomizedNumbers.indexOf(tempYear) || tempYear == year || tempYear == originalYear) {
                console.log('Trying again');
                return getRandomYear(answers, originalYear);
            }

            alreadyRandomizedNumbers.push(tempYear);

            return tempYear;
        }

        function generateQuestion(type, data) {
            if (type === 'artistName') {
                var answers = new Array();
                answers.push({
                    'text' : data.artist.name,
                    'correct' : true
                });
                for (var i = 0; i <= 2; i++) {
                    answers.push({
                        'text' : data.artist.similar.artist[i].name,
                        'correct' : false
                    })
                }
                console.log('answers', answers);
                console.log('Suffled answers', shuffle(answers));

                $scope.question = {
                    'question' : 'Vad heter artisten?',
                    'answers' : shuffle(answers)
                };
            } else if (type === 'yearFormed') {
                console.log('Year formed', data.artist.bio.yearformed);

                if (typeof data.artist.bio.yearformed === 'undefined') {
                    getNextQuestion();
                }

                var answers = new Array();
                answers.push({
                    'text' : data.artist.bio.yearformed,
                    'correct' : true
                });

                for (var i = 0; i <= 2; i++) {
                    answers.push({
                        'text' : getRandomYear(answers, data.artist.bio.yearformed),
                        'correct' : false
                    })
                }

                $scope.question = {
                    'question' : 'Vilket år började ' + $scope.currentlyPlaying.artist + '?',
                    'answers' : shuffle(answers)
                };
            } else if (type === 'artistImage') {
                console.log('Trying to create a question with artist images.');
                var answers = new Array();
                answers.push({
                    'image' : data.artist.image[4]['#text'],
                    'correct' : true
                });
                // console.log('Related', data.artist.similar);
                for (var i = 0; i <= 2; i++) {
                    answers.push({
                        'image' : data.artist.similar.artist[i].image[4]['#text'],
                        'correct' : false
                    })
                }
                console.log('answers', answers);
                console.log('Suffled answers', shuffle(answers));

                $scope.question = {
                    'question' : 'Hur ser ' + $scope.currentlyPlaying.artist + ' ut?',
                    'answers' : shuffle(answers)
                };
            }
        }


        $scope.selectChannel = function(channel) {
            $scope.currentChannel = channel;
            sr.getCurrentlyPlaying(channel.id).then(function(r) {
                console.log('Currently:', r.playlist.song);
                $scope.currentlyPlaying = {};
                // $scope.currentlyPlaying = r.playlist.song.artist + ' - ' + r.playlist.song.title;
                $scope.currentlyPlaying.artist = r.playlist.song.artist;
                $scope.currentlyPlaying.title = r.playlist.song.title;

                getNextQuestion();
            });
        };

        $scope.checkAnswer = function(answer) {
            if (answer.correct) {
                console.info('Rätt svar!');
                getNextQuestion();
            } else {
                console.info('Fel svar!');
            }
            $scope.question.answers[$scope.question.answers.indexOf(answer)].selected = true;
        }

        $scope.renderHtml = function(html) {
            return $sce.trustAsHtml(html);
        };

        $scope.reloadPage = function() {
            window.location.reload();
        }
});
