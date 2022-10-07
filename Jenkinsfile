pipeline {
  agent any

  environment {
    CODECOV_TOKEN = '6ad9bfd2-d8a7-495e-9f51-8dda432874b8'
  }

  stages {
    stage('build') {
      steps {
        sh 'echo "Installing modules..."'
        sh 'npm install'
      }
    }

    stage('test') {
      steps {
        sh 'echo "Running tests"'
        sh 'npm run test'
        sh 'echo "Sending codecoverage report..."'
        sh 'curl -Os https://uploader.codecov.io/latest/linux/codecov'
        sh 'chmod +x codecov'
        sh './codecov -t $CODECOV_TOKEN'
      }
    }

    stage('deploy') {
      when {
        branch 'main'
      }
      steps {
        sh 'echo "Building app..."'
        sh 'npm run build'
        sh 'echo "Sending files to remote server"'
        sh 'scp -i ~/.ssh/id_rsa dist/* dactglom_cloud@34.116.216.155:/var/www/34.116.216.155'
      }
    }
  }
}
