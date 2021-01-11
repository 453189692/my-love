pipeline {
  agent {
    docker {
      image 'my-love'
      args ''' --name my-love \\
  --rm \\
  -d \\
  -p 8080:8080
'''
    }

  }
  stages {
    stage('git pull') {
      steps {
        git(credentialsId: '-----BEGIN OPENSSH PRIVATE KEY----- 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 -----END OPENSSH PRIVATE KEY-----', url: 'https://github.com/453189692/my-love.git', branch: 'master', changelog: true)
      }
    }

    stage('yarn install') {
      steps {
        sh '''yarn
yarn build'''
      }
    }

  }
}