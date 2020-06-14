<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *  normalizationContext={"groups"={"hospital_read"}}
 * )
 * @ORM\Entity(repositoryClass="App\Repository\HospitalRepository")
 */
class Hospital
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"users_read","hospital_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(min=2, minMessage="Nom trop court", max=254, maxMessage="Nom trop long")
     * @Assert\NotBlank(message="Nom obligatoire")
     * @Groups({"users_read","hospital_read"})
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Province", inversedBy="hospitals")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="Province obligatoire")
     * @Groups({"users_read","hospital_read"})
     */
    private $province;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"users_read","hospital_read"})
     */
    private $latitude;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Groups({"users_read","hospital_read"})
     */
    private $longitude;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\User", inversedBy="hospitals")
     * @Groups({"hospital_read"})
     */
    private $user;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\CaseNumber", mappedBy="hospital", cascade={"persist", "remove"})
     * @Groups({"users_read","hospital_read"})
     */
    private $caseNumber;

    public function __construct()
    {
        $this->user = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getProvince(): ?Province
    {
        return $this->province;
    }

    public function setProvince(?Province $province): self
    {
        $this->province = $province;

        return $this;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(?float $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(?float $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUser(): Collection
    {
        return $this->user;
    }

    public function addUser(User $user): self
    {
        if (!$this->user->contains($user)) {
            $this->user[] = $user;
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->user->contains($user)) {
            $this->user->removeElement($user);
        }

        return $this;
    }

    public function getCaseNumber(): ?CaseNumber
    {
        return $this->caseNumber;
    }

    public function setCaseNumber(CaseNumber $caseNumber): self
    {
        $this->caseNumber = $caseNumber;

        // set the owning side of the relation if necessary
        if ($caseNumber->getHospital() !== $this) {
            $caseNumber->setHospital($this);
        }

        return $this;
    }
}
