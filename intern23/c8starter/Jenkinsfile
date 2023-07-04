pipeline {
  agent any
  environment {
    SCANNER_QUBE_HOME = tool 'SonarQubeScanner'
    LHCI_BUILD_CONTEXT__CURRENT_BRANCH = "${env.BRANCH_NAME}"
    LHCI_BUILD_CONTEXT__EXTERNAL_BUILD_U = "${env.BUILD_URL}"
    CURRENT_WORKSPACE = "${env.WORKSPACE}"
    // Noti for Group
    OFFICE365_WEBHOOK = credentials('1874cd82-e930-4d9c-9a47-2fc633333320')
    // Noti for tech leads
	  TECH_LEAD_OFFICE_WEBHOOK = credentials('584c84af-6162-4d3e-a364-0e9e29545773')
    GIT_EMAIL_COMMIT = sh(script: "git --no-pager show -s --format='%ae'", returnStdout: true).trim()
    
    BOX_DEVELOP_EC2_IP = credentials('BOX_DEVELOP_EC2_IP')
    DOCKER_DEV_PATH = '/srv/sites/html/sites/tailwindcss'
  }
  options { 
    disableConcurrentBuilds() 
  }
  stages {
     stage('Sonarqube Analysis') {
      when {
        anyOf {
          branch 'tailwind/setup-html'
          // allOf {
          //   environment name: 'CHANGE_TARGET', value: 'master'
          //   branch 'PR-*'
          // }
        }
      }
      steps {
        script {
          withSonarQubeEnv("9thWonder SonarQube VN") {
            sh "${SCANNER_QUBE_HOME}/bin/sonar-scanner"
          }
          def qg = waitForQualityGate()
          if(qg.status != "OK"){
            echo "${qg.status}"
            error "Pipeline aborted due to quality gate coverage failure: ${qualitygate.status}"
          }
        }
      }
    }

    //   stage('Build') {
    //   when {
    //     branch 'tailwind/setup-html'
    //   }
    //   steps {
    //     nodejs(nodeJSInstallationName: 'NodeJSv14') {
    //       catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
    //         echo "Begin Build"
    //         sh "npm i"
    //         sh "cd  $CURRENT_WORKSPACE && export NODE_OPTIONS='--max-old-space-size=8192' && npm run gulp -- build"
    //         echo "End Build"
    //       }
    //     }
    //     //script {
    //     //  sh 'cd $CURRENT_WORKSPACE && npm i && npm run gulp -- build'
    //     //}
    //   }
    // }

    //   stage('Deploy to Docker Server') {
    //   when {
    //     branch 'tailwind/setup-html'
    //   }
    //   steps {
    //     sh "echo $GIT_COMMIT | cut -c 1-8 > $CURRENT_WORKSPACE/gitcmid.txt"
    //     sshagent(credentials: ['BOX_DEVELOP_UBUNTU']) {
    //       sh 'ssh -o StrictHostKeyChecking=no -l ubuntu $BOX_DEVELOP_EC2_IP \"' + "mkdir -p $DOCKER_DEV_PATH" + '\"'
    //       sh 'rsync -avhze "ssh -o StrictHostKeyChecking=no" "$CURRENT_WORKSPACE/gitcmid.txt" ubuntu@$BOX_DEVELOP_EC2_IP:$DOCKER_DEV_PATH'
    //       sh 'rsync -avhze "ssh -o StrictHostKeyChecking=no" "$CURRENT_WORKSPACE/public/" ubuntu@$BOX_DEVELOP_EC2_IP:$DOCKER_DEV_PATH'
    //       // sh 'rsync -avhze "ssh -o StrictHostKeyChecking=no" "$CURRENT_WORKSPACE/docker-compose.yml" ubuntu@$BOX_DEVELOP_EC2_IP:$DOCKER_DEV_PATH'
    //     }
    //   }
    // }

    // stage('Deploy to 9thwonder Digital') {
    //   when {
    //     expression { params.buildStaging == true }
    //   }
    //   steps {
    //     echo "Deploying Staging Branch"
    //     sshagent(credentials: ['AWS_CARBON8_DEMO']) {
    //       sh 'rsync -avhze "ssh -o StrictHostKeyChecking=no" --delete "$CURRENT_WORKSPACE/public/" jenkins_9wdev@$VN_BOX_STAGING_IP:$DOCKER_STAGING_PATH/src'
    //       sh 'rsync -avhze "ssh -o StrictHostKeyChecking=no" --delete "$CURRENT_WORKSPACE/custom.conf" jenkins_9wdev@$VN_BOX_STAGING_IP:$DOCKER_STAGING_PATH'
    //       sh 'rsync -avhze "ssh -o StrictHostKeyChecking=no" --delete "$CURRENT_WORKSPACE/docker-compose.yml" jenkins_9wdev@$VN_BOX_STAGING_IP:$DOCKER_STAGING_PATH'
    //     }
    //     echo "End Deploy"
    //   }
    // }
      stage("Scan with lighthouse CI") {
      when {
        branch 'tailwind/setup-html'
      }
      steps {
        nodejs(nodeJSInstallationName: 'NodeJSv14') {
          script{
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
              env.GIT_COMMIT_MSG = sh (script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
              env.LHCI_BUILD_CONTEXT__COMMIT_MESSAGE = "${env.GIT_COMMIT_MSG} - ${env.BUILD_URL}"
            }
          }
          echo "${env.LHCI_BUILD_CONTEXT__COMMIT_MESSAGE}"
          sh 'lhci autorun'
		    }
      }
    }
  }
  post {
    failure {        
      script {            
        // Noti for Group
        office365ConnectorSend(webhookUrl: "${OFFICE365_WEBHOOK}", color:'#87ab63',  message: "\n\r###Build Failed : <http://172.31.40.152/app/projects/c8starter/dashboard>")
        // Noti for tech leads
        office365ConnectorSend(webhookUrl: "${TECH_LEAD_OFFICE_WEBHOOK}", color:'#FF0000',  message: "${env.GIT_EMAIL_COMMIT} FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL}) \n Commit: ${env.GIT_COMMIT}", status: 'FAILED')
      }
    }
  }
}