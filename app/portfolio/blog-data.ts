export type BlogPost = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
  coverGradient: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-gitops-changes-how-your-team-ships",
    title: "Why GitOps Changes How Your Team Ships to Production",
    subtitle:
      "The shift from push-based deployments to a pull-based, Git-native model — and why it makes production safer.",
    date: "2026-02-18",
    readTime: "5 min read",
    tags: ["GitOps", "CI/CD", "Platform engineering"],
    coverGradient: "from-cyan-500/20 via-blue-500/20 to-violet-500/20",
    content: `Most teams ship to production by running a script, triggering a pipeline, or pressing a button in a deployment tool. Someone applies a change, something happens in the cluster, and the team holds their breath for a few minutes to see if it worked. If it didn't, the rollback is usually manual, often stressful, and sometimes involves someone SSH-ing into a server at 11pm.

GitOps is a different model. The core idea is straightforward: your Git repository is the single source of truth for what should be running in your infrastructure. Instead of pushing changes into your cluster, an agent running inside the cluster — ArgoCD is the most common choice — continuously watches the repository and pulls it into sync with what's actually deployed. If your cluster drifts from what's in Git, the agent corrects it. If you want to deploy a new version, you merge a pull request.

The immediate practical benefit is auditability. Every change to your production environment is a commit. It has an author, a timestamp, a description, and a diff. You can see exactly what changed, when, and why — without digging through CI logs or asking someone what they ran last Tuesday. In regulated industries, that audit trail alone justifies the change.

The second benefit is rollback. Rolling back a GitOps deployment means reverting a commit. The cluster converges on the previous state automatically. There is no special rollback command to remember, no procedure to rehearse, no risk of forgetting a step under pressure. You revert the commit and wait thirty seconds.

The third benefit is what happens to your team's relationship with production. When the cluster is always converging toward what's in Git, engineers stop treating production as a place where things are manually configured and start treating it as a reflection of code. That shift in mental model reduces the number of undocumented changes, the amount of configuration drift, and the number of incidents that start with "someone changed something but we're not sure what."

The transition to GitOps isn't always frictionless. Teams that are used to imperative deployments — kubectl apply, helm upgrade, direct API calls — have to get comfortable with a more declarative, asynchronous model. Changes don't take effect the moment you merge; they take effect when the agent reconciles. That small delay can feel uncomfortable at first, particularly during incident response when you want to know immediately whether your fix worked.

The tooling has a learning curve too. ArgoCD, Flux, and similar tools have their own concepts — Applications, AppProjects, sync policies, health checks — that take time to understand well. Getting the right balance of auto-sync versus manual sync, understanding how to handle secrets in a GitOps model, and knowing when to break glass and apply something directly are skills that come with experience.

But the long-term payoff is a deployment process that teams actually trust. When shipping to production means merging a pull request and watching a dashboard go green, engineers deploy more often, more confidently, and with less ceremony. And that — more frequent, lower-risk deployments — is one of the clearest signals of a healthy engineering platform.`,
  },
  {
    slug: "terraform-modules-scaling-multi-cloud-infrastructure",
    title: "Terraform Modules: The Right Way to Scale Multi-Cloud Infrastructure",
    subtitle:
      "How reusable IaC modules reduce drift, speed up delivery, and keep multi-cloud infrastructure consistent.",
    date: "2026-03-10",
    readTime: "6 min read",
    tags: ["Terraform", "IaC", "Cloud", "Platform engineering"],
    coverGradient: "from-amber-500/20 via-orange-500/20 to-rose-500/20",
    content: `The first time most teams use Terraform, they write everything in a single file. It works. The infrastructure gets provisioned. Then the team needs a second environment, so they copy the file, change a few values, and provision that too. Then a third. Then someone changes the VPC configuration in one environment but forgets to update the others. Then a new engineer joins and isn't sure which environment's Terraform is the canonical version. Then something breaks in production and no one is certain whether the infrastructure matches what's in the codebase.

This is the configuration drift problem, and it's almost universal in teams that haven't deliberately structured their Terraform. The fix isn't more discipline — it's better architecture. Specifically, it's modules.

A Terraform module is a reusable unit of infrastructure. You define the pattern once — say, a GKE cluster with standard node pool configuration, network settings, and monitoring — and then call that module everywhere you need it, passing in the values that differ between environments. The module enforces consistency. Every GKE cluster created through that module has the same baseline structure. If you need to change the default machine type, you change it in one place and every environment that uses the module gets the update on the next apply.

The practical difference this makes becomes obvious when you're managing infrastructure across multiple environments and multiple cloud providers. GCP for the primary workloads, AWS for specific services, staging and production for each — without modules, that's a sprawling collection of Terraform files that gradually drift apart. With modules, it's a small collection of well-defined patterns and a set of environment-specific configurations that call them. The surface area for drift shrinks dramatically.

Writing good modules takes more thought than writing flat Terraform. The most important discipline is separating what should be configurable from what should be fixed. A module that exposes every possible input becomes as complex as the resource it wraps and provides no real consistency guarantee. A module that fixes the right defaults and exposes only the values that legitimately differ between environments is much more useful. Getting that balance right requires understanding how the infrastructure is actually used, which comes with time.

Versioning is the other piece that matters at scale. If your modules live in a shared repository and teams are free to update them directly, a change to a module can unexpectedly affect environments that weren't part of the plan. Pinning module versions — either to a specific Git tag or to a registry release — means that consuming environments get updates deliberately, when they're ready, rather than automatically. It adds a small amount of friction but prevents a large class of surprise.

The outcome of well-structured Terraform, in practice, is that provisioning a new environment stops being a project and starts being a task. Someone creates a new environment-specific configuration file, calls the existing modules, and runs a plan. If the modules are well-tested and the variables are documented, that can take an hour rather than a day. The team trusts that the new environment matches the existing ones because it's built from the same patterns. And when something needs to change across all environments, the change is made once and applied consistently.

Infrastructure as Code is most valuable when it actually functions as code — with the same emphasis on reusability, maintainability, and consistency that good application code gets. Modules are the primary mechanism for getting there in Terraform. The investment in writing them well pays back every time you provision something new without starting from scratch.`,
  },
  {
    slug: "kubernetes-probes-liveness-readiness-startup",
    title: "Kubernetes Probes: Getting Liveness, Readiness, and Startup Right",
    subtitle:
      "Three probe types, one common source of production incidents. Here's what each one does and how to configure them without shooting yourself in the foot.",
    date: "2026-03-17",
    readTime: "6 min read",
    tags: ["Kubernetes", "Platform engineering", "Reliability"],
    coverGradient: "from-emerald-500/20 via-cyan-500/20 to-blue-500/20",
    content: `Kubernetes health probes are one of those features that seem simple until something goes wrong in production. A pod gets killed in a restart loop. Traffic hits a service that isn't ready. A slow-starting application gets terminated before it finishes initialising. In most cases, the root cause is a probe that's misconfigured — either too aggressive, too lenient, or confused with another probe type.

There are three probe types, and understanding what each one is for matters more than knowing the configuration syntax.

A liveness probe answers one question: is this container still alive and functioning, or is it stuck in a state it can't recover from? If the liveness probe fails, Kubernetes kills the container and starts a new one. This is the probe you use for deadlock detection — for situations where the process is still running but is no longer capable of doing useful work. The key thing to understand is that liveness is not for slow startup or transient errors. If a container fails a liveness probe during startup because it hasn't finished initialising, Kubernetes will restart it — and if the restart doesn't help, you end up in a CrashLoopBackOff. This is one of the most common misconfiguration mistakes.

A readiness probe answers a different question: is this container ready to receive traffic? If the readiness probe fails, Kubernetes removes the pod from the service endpoints. No requests are routed to it. The container keeps running — it just isn't serving traffic. Readiness is the right tool for transient unavailability: a dependency is down, a cache is warming up, the container is handling a burst and needs a moment before it can take more requests. Unlike liveness, a failed readiness probe doesn't cause a restart. It's a temporary signal, not a death sentence.

A startup probe is the newest of the three, and it exists specifically to solve the slow-start problem that liveness probes create. If you have a container that takes 60 or 90 seconds to initialise — a JVM application, a service loading a large model, anything with substantial startup work — you can't set a liveness probe with a generous initialDelaySeconds without also making your deadlock detection slow for the life of the pod. The startup probe runs instead of the liveness probe until it succeeds. Once it does, the liveness probe takes over. This separation gives you fast deadlock detection during normal operation without penalising slow-starting containers.

In practice, the most robust configuration uses all three. Set a startup probe with a high failureThreshold and a reasonable periodSeconds — enough time for your slowest valid startup. Set a liveness probe with a low failureThreshold and a short periodSeconds, because once the application is running, a genuine deadlock should be detected quickly. Set a readiness probe that checks whether the application can actually handle requests — not just that the process is alive, but that the dependencies are reachable and the service is warm.

The other common mistake is using an HTTP endpoint that always returns 200 regardless of application state. A probe that can't fail provides no signal. Your liveness endpoint should actually check whether the application is functional. Your readiness endpoint should check whether it's ready to serve. These are different questions and they deserve different implementations.

Probes configured correctly are invisible — your pods start cleanly, bad containers get replaced quickly, and traffic never hits a service that isn't ready. Probes configured incorrectly are a reliable source of production incidents. The investment in getting them right is small compared to the cost of debugging a CrashLoopBackOff at 2am.`,
  },
  {
    slug: "incident-response-kubernetes-runbook",
    title: "Incident Response on Kubernetes: A Practical Runbook",
    subtitle:
      "The commands, thought process, and order of operations I use when something breaks in a production cluster.",
    date: "2026-03-21",
    readTime: "7 min read",
    tags: ["Kubernetes", "Platform engineering", "Incident response"],
    coverGradient: "from-rose-500/20 via-fuchsia-500/20 to-violet-500/20",
    content: `The first few minutes of a Kubernetes incident are the ones that matter most. If you spend them trying to remember what commands to run, or second-guessing which namespace to look in, you lose time that has a direct cost — in downtime, in user impact, in compounding failures. Having a practiced mental runbook doesn't mean you follow it rigidly in every incident. It means you know the starting points well enough that you can adapt without losing your footing.

This is the order of operations I follow when something breaks in a production cluster.

Start with scope. Before you look at any logs, run kubectl get pods -n <namespace> and kubectl get events -n <namespace> --sort-by='.lastTimestamp'. The pod list tells you what's running and what's not. The events list tells you what Kubernetes has been doing recently — scheduling failures, image pull errors, OOM kills, probe failures. Events are time-ordered and surprisingly informative, especially for issues that started minutes or hours ago rather than just now.

Next, narrow to the failing component. If a specific pod is in CrashLoopBackOff, kubectl describe pod <pod-name> is your next move. The describe output shows the container's last exit code, the reason for the most recent restart, and the full event timeline for that pod. Exit code 137 means the container was killed by SIGKILL — usually an OOM kill, check your memory requests and limits. Exit code 1 is a generic application crash, you need the logs. Exit code 0 means the container exited cleanly but unexpectedly, which usually means a bug in the startup logic.

For logs, kubectl logs <pod-name> --previous gets you the logs from the last failed container, not the currently running one. This is the flag most people forget. If you're looking at a pod in a restart loop and you run kubectl logs without --previous, you'll see the logs from the current (brief) startup, not the crash that triggered the restart.

If the issue isn't obvious from the pod and its logs, expand scope again. Check if it's infrastructure — kubectl top nodes to see whether any nodes are under memory or CPU pressure. Check if it's a networking issue by using kubectl exec to run a curl or nc from inside a running pod to the failing service. Check whether the service and endpoints are correctly configured with kubectl get endpoints <service-name>.

For incidents involving a rollout, kubectl rollout status deployment/<name> and kubectl rollout history deployment/<name> are your first stops. If the new version is bad, kubectl rollout undo deployment/<name> will revert to the previous ReplicaSet. The rollout undo is one of the most useful commands in a real incident — it's fast, it's reliable, and it works even when the deployment is stuck.

The last thing, and the one most people skip during an incident: once it's resolved, write down what you did and in what order. Not a formal post-mortem necessarily, but enough that you and your team can reconstruct the timeline. The pattern of incidents in a system tells you more about what needs to be fixed structurally than any single event does. That information only accumulates if you capture it.`,
  },
  {
    slug: "nextjs-server-components-practical-guide",
    title: "Server Components in Next.js: What They Actually Change",
    subtitle:
      "Not hype — a practical look at where Server Components help, where they don't, and how to think about the boundary between server and client.",
    date: "2026-03-25",
    readTime: "5 min read",
    tags: ["Next.js", "React", "Frontend"],
    coverGradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
    content: `React Server Components landed in Next.js App Router as a default, which means most developers encountered them not by choosing to adopt a new pattern but by having their assumptions about how React works quietly invalidated. Components that import server-only modules and don't bundle them to the client. Components that run on the server and never appear in the JavaScript bundle. A different mental model for what a component is and where it runs.

The core idea is that not every component needs to be interactive, and not every component needs to send code to the browser. If a component fetches data and renders HTML, and nothing about it changes based on user interaction, there's no reason for it to run on the client at all. Server Components make that distinction explicit and structural rather than a performance optimisation you apply after the fact.

The practical benefit that matters most for most applications is bundle size. Heavy dependencies — markdown parsers, date libraries, syntax highlighters, data transformation utilities — can live entirely on the server. They fetch data, render output, and produce HTML. None of that code ships to the browser. For content-heavy applications, the difference in JavaScript payload can be significant, and the improvement in initial load performance is proportional.

The second benefit is data access simplicity. In a Server Component, you can query a database or call an API directly, without creating an API route to proxy the request and a client-side fetch to call it. The data fetching and the rendering happen in the same function. For many common patterns — a product page that needs a database record, a blog post that needs content from a CMS — this is meaningfully simpler than the equivalent pattern in the pages router.

The part that trips people up is the boundary. A Server Component can render Client Components, but a Client Component cannot render a Server Component as a child (it can render one as a prop passed from a server parent, but that's a subtler pattern). State, event handlers, browser APIs, and hooks all require client components. The architecture decision is where to draw the line: push as much as possible to the server, use client components only where you need interactivity.

The honest version of the tradeoff is this: Server Components make the common case — fetch data, render HTML — simpler and faster, at the cost of making the mental model more complex. You need to understand where each component runs, which libraries work in which context, and how to compose server and client components correctly. For teams building data-heavy, content-rich applications, the investment pays off quickly. For applications that are primarily interactive — dashboards, editors, real-time tools — the benefit is smaller because most of the components need to be client components anyway.

The most useful thing is to stop thinking of "server" and "client" as deployment concepts and start thinking of them as rendering contexts. Server Components render once, on the server, and produce HTML. Client Components render on the client and can respond to state changes. Most applications need both, in the right proportion.`,
  },
];
