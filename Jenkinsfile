pipeline {
  agent any

  environment {
    CODECOV_TOKEN = '6ad9bfd2-d8a7-495e-9f51-8dda432874b8'
  }

  stages {
    stage('build') {
      steps {
        sh 'npm install'
      }
    }

    stage('test') {
      steps {
        sh 'npm run test'
        sh 'curl -Os https://uploader.codecov.io/latest/linux/codecov'
        sh 'chmod +x codecov'
        sh './codecov'
      }
    }

    stage('deploy') {
      steps {
        echo 'Deploying the application...'
      }
    }
  }
}
