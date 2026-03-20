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
];
