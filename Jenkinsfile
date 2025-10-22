pipeline {
  agent any

  environment {
    DOCKER_USER    = "nguyet2004"   // sửa lại
    BACKEND_IMAGE  = "backend"
    FRONTEND_IMAGE = "frontend"
    DEPLOY_DIR     = "/opt/deploy/app"
  }

  options {
    skipDefaultCheckout(true)
    timestamps()
    ansiColor('xterm')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout([$class: 'GitSCM',
          branches: [[name: '*/main']],
          userRemoteConfigs: [[
            url: 'https://github.com/wallmiin/devops2.git', // sửa lại
            credentialsId: 'github-pat'
          ]]
        ])
      }
    }

    stage('Build Backend Docker') {
      steps {
        sh """
          docker build \
            -t docker.io/${DOCKER_USER}/${BACKEND_IMAGE}:latest \
            -f Dockerfile.backend .
        """
      }
    }

    stage('Build Frontend Docker') {
      steps {
        sh """
          docker build \
            -t docker.io/${DOCKER_USER}/${FRONTEND_IMAGE}:latest \
            -f frontend/Dockerfile .
        """
      }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          sh """
            echo \$PASS | docker login -u \$USER --password-stdin
            docker push docker.io/${DOCKER_USER}/${BACKEND_IMAGE}:latest
            docker push docker.io/${DOCKER_USER}/${FRONTEND_IMAGE}:latest
          """
        }
      }
    }

    stage('Deploy (same host)') {
      steps {
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
