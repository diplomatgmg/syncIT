from apps.hard_skill.models import UnknownHardSkill


def normalize_hard_skill(skill: str):
    match skill.lower():
        case ".net" | ".net core" | ".net framework":
            return ".NET"
        case "1c" | "1c":
            return "1С"
        case "1с-битрикс" | "1c-битрикс":
            return "1С-Битрикс"
        case "asp net" | "aspnet" | "asp.net":
            return "ASP.NET"
        case "angular" | "angular js" | "angular.js":
            return "Angular"
        case "ansible":
            return "Ansible"
        case "assembly":
            return "Assembly"
        case "agile":
            return "Agile"
        case "aws":
            return "AWS"
        case "babel":
            return "Babel"
        case "bash":
            return "Bash"
        case "bitrix24" | "bitrix":
            return "Bitrix24"
        case "Bootstrap":
            return "Bootstrap"
        case "bitbucket":
            return "BitBucket"
        case "битрикс24" | "битрикс 24":
            return "Битрикс24"
        case "css" | "css3" | "css 3":
            return "CSS"
        case "scss" | "sass":
            return "SASS"
        case "c":
            return "C"
        case "c#":
            return "C#"
        case "c++":
            return "C++"
        case "ci/cd":
            return "CI/CD"
        case "css" | "css3":
            return "css"
        case "celery":
            return "Celery"
        case "confluence":
            return "Confluence"
        case "clickhouse":
            return "ClickHouse"
        case "cucumber":
            return "Cucumber"
        case "delphi":
            return "Delphi"
        case "dart":
            return "Dart"
        case "devops":
            return "DevOps"
        case "django":
            return "Django"
        case "django rest" | "django framework" | "django rest framework":
            return "Django REST Framework"
        case "docker":
            return "Docker"
        case "docker compose" | "docker-compose":
            return "Docker Compose"
        case "dry":
            return "DRY"
        case "express":
            return "Express"
        case "erlang":
            return "Erlang"
        case "emberjs" | "ember js" | "ember.js":
            return "Ember.js"
        case "electron":
            return "Electron"
        case "elasticsearch" | "elastic search":
            return "Elasticsearch"
        case "elixir":
            return "Elixir"
        case "f#":
            return "F#"
        case "fastapi" | "fast api":
            return "FastAPI"
        case "figma":
            return "Figma"
        case "flask":
            return "Flask"
        case "flutter":
            return "Flutter"
        case "git":
            return "Git"
        case "grails":
            return "Grails"
        case "github":
            return "GitHub"
        case "gitlab":
            return "GitLab"
        case "go" | "golang" | "go lang":
            return "Go"
        case "graphql":
            return "GraphQL"
        case "grafana":
            return "Grafana"
        case "html" | "html5" | "html 5":
            return "HTML"
        case "haskell":
            return "Haskell"
        case "jquery":
            return "JQuery"
        case "js" | "javascript" | "java script":
            return "JavaScript"
        case "java":
            return "Java"
        case "jenkins":
            return "Jenkins"
        case "jira":
            return "Jira"
        case "jest":
            return "Jest"
        case "kafka":
            return "Kafka"
        case "kotlin":
            return "Kotlin"
        case "kubernetes" | "k8s":
            return "Kubernetes"
        case "kanban":
            return "Kanban"
        case "laravel":
            return "Laravel"
        case "linux":
            return "Linux"
        case "lua":
            return "Lua"
        case "less":
            return "Less"
        case "mongodb":
            return "MongoDB"
        case "meteor":
            return "Meteor"
        case "mysql":
            return "MySQL"
        case "macos" | "mac os":
            return "macOS"
        case "nginx":
            return "Nginx"
        case "node.js" "node js":
            return "Node.js"
        case "nextjs" | "next.js" | "next js":
            return "Next.js"
        case "nuxtjs" | "nuxt.js" | "nuxt js":
            return "Nuxt.js"
        case "nestjs" | "nest.js" | "nest js":
            return "NestJS"
        case "nosql" | "no sql":
            return "NoSQL"
        case "oop" | "ооп":
            return "ООП"
        case "oracle":
            return "Oracle"
        case "php":
            return "PHP"
        case "postgresql" | "postgres" | "postgre sql" | "postgres sql" | "postgresql sql" | "psql":
            return "PostgreSQL"
        case "python" | "python3" | "python 3":
            return "Python"
        case "pytorch":
            return "PyTorch"
        case "perl":
            return "Perl"
        case "pandas":
            return "Pandas"
        case "postman":
            return "Postman"
        case "qa":
            return "QA"
        case "rest" | "restapi" | "rest api" | "restful" | "restful api" | "rest-api":
            return "REST API"
        case "rabbit" | "rabbit mq" | "rabbitmq":
            return "RabbitMQ"
        case "react" | "react.js" | "react js":
            return "React"
        case "reactnative" | "react native":
            return "React Native"
        case "redis":
            return "Redis"
        case "redux":
            return "Redux"
        case "redux toolkit" | "redux-toolkit":
            return "Redux Toolkit"
        case "react testing library":
            return "React Testing Library"
        case "react-query" | "react query":
            return "React Query"
        case "rtk-query" | "rtk query":
            return "RTK Query"
        case "ruby":
            return "Ruby"
        case "rust":
            return "Rust"
        case "svelte":
            return "Svelte"
        case "scala":
            return "Scala"
        case "seo" | "seo оптимизация" | "seo-оптимизация":
            return "SEO"
        case "soap":
            return "SOAP"
        case "sql":
            return "SQL"
        case "spring" | "spring boot" | "spring framework":
            return "Spring"
        case "solid":
            return "Solid"
        case "symfony":
            return "Symfony"
        case "swift":
            return "Swift"
        case "spa":
            return "SPA"
        case "scrum":
            return "Scrum"
        case "slack":
            return "Slack"
        case "shell":
            return "Shell"
        case "tcp/ip":
            return "TCP/IP"
        case "tailwind" | "tailwindcss" | "tailwind css":
            return "Tailwind"
        case "terraform":
            return "Terraform"
        case "ts" | "typescript" | "type script":
            return "TypeScript"
        case "tensorflow":
            return "TensorFlow"
        case "unit testing":
            return "Unit Testing"
        case "unix":
            return "Unix"
        case "ubuntu":
            return "Ubuntu"
        case "unity":
            return "Unity"
        case "unreal engine":
            return "Unreal Engine"
        case "vue" | "vue3" | "vue3" | "vue js" | "vuejs" | "vue.js":
            return "Vue"
        case "webpack":
            return "Webpack"
        case "windows":
            return "Windows"
        case "zabbix":
            return "Zabbix"
        case "jquery":
            return "jQuery"
        case _:
            UnknownHardSkill.objects.get_or_create(name=skill)
            return None
