pipeline {
  agent any

  environment {
    DOCKER_USER    = "nguyet2004"
    BACKEND_IMAGE  = "backend"
    FRONTEND_IMAGE = "frontend"
    DEPLOY_DIR     = "/opt/deploy/app"
  }

  options {
    skipDefaultCheckout(true)
    timestamps()
  }

  stages {

    stage('Checkout') {
      steps {
        checkout([$class: 'GitSCM',
          branches: [[name: '*/main']],
          userRemoteConfigs: [[
            url: 'https://github.com/wallmiin/devops2.git',
            credentialsId: 'github-pat'
          ]]
        ])
      }
    }

    stage('Build Backend Docker') {
      steps {
        wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
          sh """
            docker build \
              -t docker.io/${DOCKER_USER}/${BACKEND_IMAGE}:latest \
              -f Dockerfile.backend .
          """
        }
      }
    }

    stage('Build Frontend Docker') {
      steps {
        wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
          sh """
            docker build \
              -t docker.io/${DOCKER_USER}/${FRONTEND_IMAGE}:latest \
              frontend/
          """
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
          withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
            sh """
              echo \$PASS | docker login -u \$USER --password-stdin
              docker push docker.io/${DOCKER_USER}/${BACKEND_IMAGE}:latest
              docker push docker.io/${DOCKER_USER}/${FRONTEND_IMAGE}:latest
            """
          }
        }
      }
    }

    stage('Deploy (same host)') {
      steps {
        wrap([$class: 'AnsiColorBuildWrapper', 'colorMapName': 'xterm']) {
          sh """
            mkdir -p ${DEPLOY_DIR}
            cd ${DEPLOY_DIR}
            docker compose pull
            docker compose up -d
            docker image prune -f
          """
        }
      }
    }

  }
}
