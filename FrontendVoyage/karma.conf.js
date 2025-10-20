// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

process.env.CHROME_BIN = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // Options Jasmine (facultatives)
      },
      clearContext: false // Garde le résultat du test visible dans le navigateur
    },
    jasmineHtmlReporter: {
      suppressAll: true // Enlève les traces dupliquées
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/frontend-voyage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],

    // 🧭 ICI on remplace Chrome par Brave
    browsers: ['Brave'],
    customLaunchers: {
      Brave: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--remote-debugging-port=9222'
        ]
      }
    },

    restartOnFileChange: true
  });
};
