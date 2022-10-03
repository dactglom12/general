pipeline {
  agent any

  stages {
    stage('build') {
      steps {
        sh 'npm install'
        echo 'Building the application...'
      }
    }

    stage('test') {
      steps {
        echo 'Testing the application...'
        echo 'Hello World'
      }
    }

    stage('deploy') {
      steps {
        echo 'Deploying the application...'
      }
    }
  }
}
