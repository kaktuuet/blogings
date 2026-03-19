import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)

  const [sub, main] = title.split("|")

  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir} class="site-title">
        <span class="title-sub">{sub}</span>
        <span class="title-main">{main}</span>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  margin: 0;
  font-family: var(--titleFont);
}

.site-title {
  text-decoration: none;
  display: inline-block;
  line-height: 1.2;
}

.title-main {
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
}

.title-sub {
  display: block;
  font-size: 0.95rem;
  opacity: 0.7;
  margin-top: 2px;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
