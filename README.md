[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHossamMohsen7%2Fjudging-scoreboard&env=PASSWORD,TYPEFORM_PERSONAL_TOKEN,TYPEFORM_WORKSPACE_ID,NEXT_PUBLIC_TITLE,NEXT_PUBLIC_LOGO_URL&envDescription=Required%20environment%20variables%20to%20make%20the%20application%20work%20properly.&envLink=https%3A%2F%2Fgithub.com%2FHossamMohsen7%2Fjudging-scoreboard%23environment-variables)

A web app to manage judging and scoreboards for competitions using [Typeform](https://www.typeform.com/) and NextJS.  
Inspired by @FADL285's [Typeform Scoreboard](https://github.com/FADL285/Typeform-Judging-Scoreboard-Frontend/).  
This project was originally created for [IEEE Mansoura Student Branch](https://ieeemansb.org) to be used in [IEEE Victoris 2.0](https://ieeemansb.org/events/ieee-victoris-20).

## Features

- Multiple competitions in one place.
- Multiple teams, criteria and judges per competition.
- Seperate scoreboard for each competition.
- Support for adding additional scores to each team.
- High precision scores with customizable rounding.
- Customizable UI (title and image).
- Easy to use.
- Mobile friendly.
- Password Protected.
- Support for viewing team position and sorts by highest score.

## Usage

1. You need to get your Typeform personal token from [here](https://admin.typeform.com/user/tokens).
1. It's recommended to use the Deploy on Vercel button in the top of this page to deploy the app, it will guide you to put the environment variables.

## Environment Variables

This project needs some important environment variables to work properly.
You can view and example in the [.env.example](.env.example) file.
| Variable | Description |
|----------|-------------|
| `PASSWORD` | The password to access the scoreboard. |
| `TYPEFORM_PERSONAL_TOKEN` | The personal token of your Typeform account. |
| `TYPEFORM_WORKSPACE_ID` | The workspace ID of your Typeform account containing the forms. |
| `NEXT_PUBLIC_TITLE` | The title of the scoreboard shown in the website. |
| `NEXT_PUBLIC_LOGO_URL` | The url of the logo shown in the website. |
| `NEXT_PUBLIC_UI_PRECISION` | The number of decimal places to round the scores to. Defaults to 3. |

## Calculations

By default, the scoreboard will show the total of criteria averages for each team. For example, if a competition has **3** judges and **2** criteria and the judges vote like the table below for Team A:
| Judge | Criteria 1 | Criteria 2 |
|-------|------------|------------|
| 1 | 5 | 4 |
| 2 | 3 | 2 |
| 3 | 1 | 3 |

The scoreboard will show the average of each criteria for the team, like the table below:
| Criteria 1 Avg | Criteria 2 Avg | Total |
|----------------|----------------|-------|
| (5+3+1)/3 = 3 | (4+2+3)/3 = 3 | 6 |

## Authors

- [Hossam Mohsen](https://github.com/HossamMohsen7)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
